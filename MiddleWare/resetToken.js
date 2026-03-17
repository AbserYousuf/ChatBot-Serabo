const jwt = require('jsonwebtoken')
const resetkey = process.env.RESET_KEY
const ResetVerify = async (req, res, next) => {
    const token = req.cookies.resetToken
    if (!token) {
        return res.status(400).json({
            success: false,
            msg: "ResetToken Required"
        })
    }
    try {
        const data = jwt.verify(token, resetkey)
        req.ResetId = data.id
        next()
    } catch (error) {
        return res.status(403).json({
            success: false,
            msg: "Invalid or Expired Token"
        })
    }
}
module.exports = ResetVerify