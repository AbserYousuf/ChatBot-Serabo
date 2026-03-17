const jwt = require('jsonwebtoken')
const logkey = process.env.LOGIN_KEY
const TokenVerify = async (req, res, next) => {
    const authheader = req.headers.authorization
    if (!authheader || !authheader.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            msg: "Authentication Token is Required (Bearer Format)"
        })
    }
    try {
        const token = authheader.split(' ')[1]
        const data = jwt.verify(token, logkey)
        req.UserId = data.id
        next()

    } catch (error) {
        console.error(error)
        return res.status(403).json({
            success: false,
            msg: "Invalid or Expired token"
        })

    }
}
module.exports = TokenVerify