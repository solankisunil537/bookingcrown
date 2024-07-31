const User = require("../model/User");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { generateStrongPassword } = require("../utils/helper");
const JWT_SECRET = process.env.JWT_SECRET

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    }
});

exports.createUser = async (req, res) => {
    const { name, email, mobilenu, businessType, businessName, address } = req.body;

    try {
        if (!name || !email || !mobilenu || !businessType || !businessName || !address) {
            return res.status(400).json({ message: 'name, email, business type all fields are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: `User with the email ${email} already exists. Please provide another email` });
        }

        // generated strong password of 8 digit
        const password = generateStrongPassword();

        user = new User({
            name,
            email,
            password,
            mobilenu,
            businessType,
            businessName,
            address
        });

        await user.save()

        // send generated password to the user's email
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Welcome to Our Service',
            text: `Hello ${name},\n\nYour account has been created successfully. Here is your password: ${password}\n\nBest regards,\nOur Service Team`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Your account has been successfully created. A password has been sent to your email address.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password. Please try again later' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password. Please try again later' });
        }

        const payload = {
            user: {
                id: user._id,
                role: user.role,
            },
        };

        jwt.sign(payload, JWT_SECRET, (err, token) => {
            if (err) throw err;
            res.json({ token, success: true });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}