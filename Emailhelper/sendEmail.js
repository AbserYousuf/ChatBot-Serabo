const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    },
    debug: true,  // add this
    logger: true
})

const sendEmail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: `"Your App" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        html
    })
}

module.exports = sendEmail