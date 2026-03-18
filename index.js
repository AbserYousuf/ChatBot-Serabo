require('dotenv').config({ path: '.env' })
const ConnectToDb = require('./Database')
const cookieparser = require('cookie-parser')
const cors = require('cors')
ConnectToDb()
const express = require('express')
const Port = process.env.PORT
const chat = require('./Routes/conv')
const session = require('./Routes/session')

const app = express()
app.set('trust proxy', 1) 
app.use(cors({
    origin: process.env.CLIENT_PORT,
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"],
    allowedHeaders: [
        "Content-Type",
        "authorization",
        "Authorization",
        "Cookie"
    ],
    credentials: true
}))
app.use(express.json())
app.use(cookieparser())
const auth = require('./Routes/auth')

app.use('/api/auth', auth)
app.use('/api/conv', chat)
app.use('/api/session', session)
app.listen(Port, () => {
    console.log(`Server is Listening on http://localhost:${Port}`)
    console.log(`FrontEnd is Listening on ${process.env.CLIENT_PORT}`)
})
