const nodemailer = require('nodemailer');

exports.emailTransporter = async () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });
    return transporter
}