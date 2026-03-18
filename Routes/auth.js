const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const OtpEMail = require("./OtpEmail")
const resetkey = process.env.RESET_KEY
const OtpEmail = require('./OtpEmail')
const rateLimit = require('express-rate-limit')
const refreshkey = process.env.REFRESH_KEY
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const Session = require('../Models/Session')
const User = require('../Models/User')
const Logkey = process.env.LOGIN_KEY
const { body, validationResult } = require('express-validator')
const sendEmail = require('../Emailhelper/sendEmail')
const { validate } = require('deep-email-validator')
const TokenVerify = require('../MiddleWare/token')
const resetToken = require('../MiddleWare/resetToken')
const Signup = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    message: "Too Many Requests , Try Again Later"
    // store: ... , // Redis, Memcached, etc. See below.
})
router.post('/signup', Signup, [
    body('name').trim().isLength({ min: 3 }).withMessage("Name Should of be Minimum 3 Characters"),
    body('username').trim().isLength({ min: 3, max: 16 }).withMessage("Username should of be  Minimum 3 and Maximum 6 characters"),
    body('email').trim().isEmail().withMessage("Please enter Valid Email").normalizeEmail(),
    body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/).withMessage("Password must have uppercase, lowercase, special character and min 8 chars")
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            msg: errors.array().map(e => e.msg)
        })

    }
    try {
        const { name, email, password, username } = req.body
         const result = await validate({
    email: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: false,
    validateDisposable: false,
    validateSMTP: false,
  })
        if (!result.valid) {
            return res.status(400).json({
                success: false,
                msg: "Please Use a Real Email"
            })
        }
        const existingUser = await User.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            const existingField = {
                email: existingUser.email === email && "Email Already Exists",
                username: existingUser.username === username && "Username Already Exists"
            }
            const message = existingField.email || existingField.username
            return res.status(400).json({
                success: false,
                msg: message
            })
        }
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)
        await User.create({
            name: name,
            email: email,
            password: newPassword,
            username: username
        })
        try {
            await sendEmail({
                to: email,
                subject: "Welcome to Our App!",
                html:`THanks For Choosing Serabo AI. Your Account has Been Created SuccessFully`
            })

        } catch (error) {
            console.error(error)
        }
        return res.status(201).json({
            success: true,
            msg: "Account Created Successfully"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Issue"
        })
    }
})
const LoginLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    message: "Too Many Requests , Try Again Later"
    // store: ... , // Redis, Memcached, etc. See below.
})
router.post('/login', LoginLimit, [
    body('email').trim().optional().isEmail().withMessage("Enter a Valid Email").normalizeEmail(),
    body('username').trim().optional().exists({ checkFalsy: true }).withMessage('Please Enter the username '),
    body('password').trim().exists({ checkFalsy: true }).withMessage("Please Enter the password"),
    body().custom((value, { req }) => {
        if (!req.body.email && !req.body.username) {
            throw new Error('Please provide email or username')
        }
        return true
    })

], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            msg: errors.array().map(e => e.msg)
        })
    }
    try {
        const { email, username, password } = req.body
        const query = []
        if (email) { query.push({ email }) }
        if (username) { query.push({ username }) }
        const findingUser = await User.findOne({ $or: query })
        if (!findingUser) {
            return res.status(404).json({
                success: false,
                msg: "Enter the Correct Credentials"
            })
        }
        const userpassword = findingUser.password
        const check = await bcrypt.compare(password, userpassword)
        if (!check) {
            return res.status(401).json({
                success: false,
                msg: "Enter the correct Credentials"
            })
        }
        const data = {
            id: findingUser._id
        }
        const logintoken = jwt.sign(data, Logkey, { expiresIn: "15m" })
        const refreshtoken = jwt.sign(data, refreshkey, { expiresIn: "7d" })

        const checkSessionId = await Session.findOne({
            userId: findingUser._id
        })
        const newSessionId = checkSessionId?.sessionId || crypto.randomUUID()
        if (!checkSessionId) {
            await Session.create({
                title: "New Chat",
                userId: findingUser._id,
                sessionId: newSessionId
            })
        }
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,   // JS can't access it
            secure: process.env.NODE_ENV === 'production', // HTTPS only
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/'
        })
        return res.status(200).json({
            success: true,
            msg: "Login Success",
            logintoken: logintoken,
            sessionId: newSessionId,
            exp: 15 * 60 * 1000
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
})
const Forgot = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    message: "Too Many Requests , Try Again Later"
    // store: ... , // Redis, Memcached, etc. See below.
})
router.post('/forgot', Forgot, [
    body('email').trim().isEmail().withMessage("Please Enter the Correct Email").normalizeEmail()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            msg: errors.array().map(e => e.msg)
        })
    }
    try {
        const { email } = req.body
   const checkemail= await validate({
    email: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: false,
    validateDisposable: false,
    validateSMTP: false,
  })
        if (!checkemail.valid) {
            return res.status(400).json({
                success: false,
                msg: "Please Enter The Correct Email"
            })
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(200).json({
                success: false,
                msg: "Email Couldnt Found.Make Sure Entered Email is Correct"
            })
        }
        const backotp = Math.floor(100000 + Math.random() * 900000).toString();
        const newotp = await bcrypt.hash(backotp, 10)
        const data = {
            id: user._id
        }
        const ResetToken = jwt.sign(data, resetkey, { expiresIn: '10m' })
        user.resetOTP = newotp;
        user.resetOTPExpire = Date.now() + 10 * 60 * 1000;
        user.resetOTPAttempts = 0
        user.resetToken = ResetToken
        await user.save()
        console.log(backotp)
        try {
            const name = user.name
            await sendEmail({
                to: email,
                subject: "Your Serabo AI Verification Code",
                html:  OtpEmail(backotp, name)
            })
            res.cookie('resetToken', ResetToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                 sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 10 * 60 * 1000,
                path:'/'
            })
            return res.status(200).json({
                success: true,
                msg: "If The Account exists , An Otp has been sended to it ",
            })
        } catch (error) {
            console.error(error)
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Issue"
        })
    }
})
router.post('/otp', resetToken, [
    body('otp').trim().exists({ checkFalsy: true })
        .withMessage("Enter the 6 digit OTP")
        .isLength({ min: 6, max: 6 })
        .withMessage("OTP must be exactly 6 digits")
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            msg: errors.array().map(e => e.msg)
        })
    }

    try {
        const { otp } = req.body
        const userId = req.ResetId

        const user = await User.findById(userId)


        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User Not Found"
            })
        }


        if (!user.resetOTP || !user.resetOTPExpire) {
            return res.status(400).json({
                success: false,
                msg: "No OTP Found or OTP Already Used"
            })
        }

        if (Date.now() > user.resetOTPExpire) {
            user.resetOTP = undefined
            user.resetOTPAttempts = undefined
            user.resetOTPExpire = undefined
            await user.save()
            return res.status(400).json({
                success: false,
                msg: "OTP Expired"
            })
        }

        if (user.resetOTPAttempts >= 5) {
            user.resetOTP = undefined
            user.resetOTPAttempts = undefined
            user.resetOTPExpire = undefined
            await user.save()
            return res.status(400).json({
                success: false,
                msg: "Too Many Attempts"
            })
        }

        const hasVerified = await bcrypt.compare(otp, user.resetOTP)
        if (!hasVerified) {
            user.resetOTPAttempts = (user.resetOTPAttempts || 0) + 1
            await user.save()
            const remaining = 5 - user.resetOTPAttempts
            return res.status(400).json({
                success: false,
                msg: `Invalid OTP. ${remaining} attempts remaining`
            })
        }


        user.resetOTP = undefined
        user.resetOTPAttempts = undefined
        user.resetOTPExpire = undefined
        await user.save()

        return res.status(200).json({
            success: true,
            msg: "OTP Verified Successfully"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Issue"
        })
    }
})
router.post('/reset', resetToken, [
    body('password').trim().exists({ checkFalsy: true }).withMessage("Password Required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/).withMessage("Password must have uppercase, lowercase, special character and min 8 chars")
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            msg: errors.array().map(e => e.msg)
        })
    }
    try {
        const { password } = req.body
        const userId = req.ResetId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not Found "
            })
        }
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)
        await User.findByIdAndUpdate(userId, { password: newPassword }, { new: true })
        res.clearCookie('resetToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path:'/'
            
        })
        return res.status(200).json({
            success: true,
            msg: "Password Updated SuccessFully"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
})
router.get('/refresh', async (req, res) => {
    const token = req.cookies.refreshtoken
    if (!token) {
        return res.status(400).json({
            success: false,
            msg: "Missing Token"
        })
    }
    try {
        const data = jwt.verify(token, refreshkey)
        const newAccessToken = jwt.sign({ id: data.id }, Logkey, { expiresIn: "15m" })
        return res.status(200).json({
            success: true,
            token: newAccessToken
        })
    } catch (error) {
        return res.status(403).json({
            success: false,
            msg: "Token Inavild Or Expired"
        })
    }
})
router.get('/user', TokenVerify, async (req, res) => {
    const id = req.UserId
    try {
        const user = await User.findById(id).select('-password ')
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            user: user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Issue"
        })
    }
})
router.post('/logout', (req, res) => {
    res.clearCookie('refreshtoken', {
        httpOnly: true,
        secure: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/'
    })
    return res.status(200).json({
        success: true,
        msg: "Logout SuccessFull"
    })
})
module.exports = router;
