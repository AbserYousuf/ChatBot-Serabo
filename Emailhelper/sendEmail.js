const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async ({ to, subject, html }) => {
  await sgMail.send({
    from: 'abseryousuf50@gmail.com',
    to,
    subject,
    html
  })
}

module.exports = sendEmail
