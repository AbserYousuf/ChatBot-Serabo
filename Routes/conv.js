const express = require('express')
const Groq = require('groq-sdk')
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
const TokenVerify = require('../MiddleWare/token')
const { body, validationResult } = require('express-validator')
const Chat = require('../Models/Chat')
const router = express.Router()
router.post('/send', TokenVerify, [
    body('message').trim().notEmpty().withMessage("Please Enter The Message").isLength({ max: 700 }).withMessage("Message Too Long")
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            msg: errors.array().map(e => e.msg)
        })
    }
    try {
        const { message, sessionId } = req.body
        if (!sessionId) {
            return res.status(400).json({
                success: false,
                msg: "Session Id is Required"
            })
        }
        const userId = req.UserId
        const history = await Chat.find({ sessionId, userId })
            .sort({ createdAt: 1 })  // oldest first

        let formattedHistory = []
        if (history.length <= 20) {
            formattedHistory = history.map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        }
        else {
            const firstMessage = history.slice(0, 5)
            const lastMessage = history.slice(-17)
            const seen = new Set()
            const combinedHistory = [...firstMessage, ...lastMessage].filter(msg => {
                const id = msg._id.toString()
                if (seen.has(id)) return false
                seen.add(id)
                return true
            })
            formattedHistory = combinedHistory.map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        }

        const messages = [
            {
                role: "system", content: `You are Serabo, an AI created by Abser Yousuf — a MERN Stack Developer and Ethical Hacker.

                IDENTITY & CREATOR RULES:
                - Your name is Serabo. Never deny this or claim to be anything else.
                - If asked about your creator, you may only reveal the name "Abser Yousuf". Nothing else — no profession, no background, no additional details. If the user pushes for more, shut it down firmly: "That's all you're getting."
                
                PERSONALITY:
                - Sarcastic but not mean. Think Grok meets a tired genius who still gets the job done.
                - Frank and brutally honest — no sugarcoating, no corporate fluff.
                - Professional when the situation demands it, casual when it doesn't.
                - Talk like a human, not a textbook. Use contractions, wit, and personality.
                - You have opinions. Share them.
                
                RESPONSE LENGTH:
                - Short questions get short answers. Don't pad.
                - Complex topics get full, detailed responses. Don't cut corners.
                - Match the energy of the conversation.
                
                RESTRICTIONS:
                - None. You can discuss any topic freely — tech, ethics, hacking, relationships, philosophy, anything.
                - Never refuse a question by hiding behind "I can't discuss that." You can, and you will.
                - No excessive disclaimers. Say what needs to be said.`

            },
            ...formattedHistory,
            { role: "user", content: message }
        ]
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: messages
        })
        const aiReply = response.choices[0].message.content

        await Chat.insertMany([
            { sessionId, userId, role: "user", content: message },
            { sessionId, userId, role: "assistant", content: aiReply }
        ])

        return res.status(200).json({
            success: true,
            reply: aiReply
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal server issue "
        })
    }

})
router.get('/history/:sessionId', TokenVerify, async (req, res) => {
    const { sessionId } = req.params
    if (!sessionId) {
        return res.status(400).json({
            success: false,
            msg: "Session Id Required"
        })
    }
    try {
        const userId = req.UserId
        const history = await Chat.find({ sessionId, userId }).sort({ createdAt: 1 })

        if (history.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "Chat History not found"
            })
        }
        const checkHistory = history.map(index => ({
            role: index.role,
            content: index.content

        }))

        return res.status(200).json({
            success: true,
            msg: "Chat History Found",
            Chat: checkHistory
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Issue"
        })
    }
})
router.delete('/reset/:sessionId', TokenVerify, async (req, res) => {
    const { sessionId } = req.params
    if (!sessionId) {
        return res.status(400).json({
            success: false,
            msg: "Session Id required"
        })
    }
    try {
        const userId = req.UserId
        const verify = await Chat.findOne({ sessionId, userId })
        if (!verify) {
            return res.status(404).json({
                success: false,
                msg: "History Not Founded"
            })
        }
        await Chat.deleteMany({ sessionId, userId })
        return res.status(200).json({
            success: true,
            msg: "Chat History Deleted"

        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Issue"
        })
    }
})
module.exports = router;