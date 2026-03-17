const TokenVerify = require('../MiddleWare/token')
const Session = require('../Models/Session')
const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const { body, validationResult } = require('express-validator')
const Chat = require('../Models/Chat')
router.post('/create', TokenVerify, async (req, res) => {
    try {
        const userId = req.UserId
        const newSessionId = crypto.randomUUID()
        await Session.create({
            title: "New Chat",
            userId: userId,
            sessionId: newSessionId
        })
        return res.status(201).json({
            success: true,
            msg: "SessionId Created SuccessFully",
            sessionId: newSessionId
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Issue"
        })
    }
})
router.get('/get', TokenVerify, async (req, res) => {
    try {
        const userId = req.UserId
        const data = await Session.find({ userId }).sort({ createdAt: -1 })
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No Sessions Found"
            })
        }
        return res.status(200).json({
            success: true,
            msg: "Sessions Founded",
            sessions: data

        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Issue"
        })
    }
})
router.put('/update/:sessionId', TokenVerify, [
    body('title').exists({ checkFalsy: true }).withMessage("Title field required").isLength({ min: 2, max: 40 }).withMessage("Title Length should of be Minimum 2 and Maximum 40 Characters")
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            msg: errors.array().map(e => e.msg)
        })
    }
    try {
        const { title } = req.body
        const { sessionId } = req.params
        const userId = req.UserId


        const data = await Session.findOneAndUpdate(
            { sessionId, userId },
            { title },
            { returnDocument: true }
        )
        if (!data) {
            return res.status(404).json({
                success: false,
                msg: "Session Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            msg: "Session Updated",
            session: data
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Issue"
        })
    }
})
router.delete('/delete/:sessionId', TokenVerify, async (req, res) => {
    const { sessionId } = req.params
    if (!sessionId) {
        return res.status(400).json({
            success: false,
            msg: "Session Id required"
        })
    }

    try {
        const userId = req.UserId
        const verify = await Session.findOne({ sessionId, userId })
        if (!verify) {
            return res.status(404).json({
                success: false,
                msg: "Session not found"
            })
        }
        await Session.deleteMany({ sessionId, userId })
        await Chat.deleteMany({ sessionId, userId })
        return res.status(200).json({
            success: true,
            msg: "Sessions and Chats Deleted"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal server Issue"
        })

    }
})
module.exports = router;