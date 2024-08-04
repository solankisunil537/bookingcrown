const User = require("../model/User");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { generateStrongPassword } = require("../utils/helper");
const bcrypt = require("bcryptjs")
const JWT_SECRET = process.env.JWT_SECRET

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

exports.createUser = async (req, res) => {
    const { name, email, mobilenu, businessType, businessName, address } = req.body;

    try {
        if (!name || !email || !mobilenu || !businessType || !businessName || !address) {
            return res.status(400).json({ message: 'name, email, business type, businessName, address all fields are required' });
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
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Welcome to BookingCrown!',
            text: `Dear ${name},
            \n\nWe are delighted to welcome you to BookingCrown, where managing your bookings and customers has never been easier. Your registration has been completed successfully, and you can now access all the features our platform offers to streamline your business operations.
            \n\nYour account has been created with the following password: ${password}
            \n\nPlease keep this information secure and use it to log in to your account and You can login with your email and password..
            \n\nIf you have any questions or need assistance, feel free to contact our support team at +91 99988 83603. We are here to help!
            \n\nBest regards,
            \nThe BookingCrown Team`
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

        const isMatch = await bcrypt.compare(password, user.password);
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
            res.json({ token, success: true, message: "Login successfull", role: user.role });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    try {
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({ message: 'Current password and new password should not be same' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match' });
        }

        // Separate regex for each validation
        const minLengthPattern = /.{6,}/;
        const uppercasePattern = /[A-Z]/;
        const lowercasePattern = /[a-z]/;
        const numberPattern = /\d/;
        // const specialCharPattern = /[@$!%*?&]/;

        if (!minLengthPattern.test(newPassword)) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long'
            });
        }

        if (!uppercasePattern.test(newPassword)) {
            return res.status(400).json({
                message: 'Password must include at least one uppercase letter'
            });
        }

        if (!lowercasePattern.test(newPassword)) {
            return res.status(400).json({
                message: 'Password must include at least one lowercase letter'
            });
        }

        if (!numberPattern.test(newPassword)) {
            return res.status(400).json({
                message: 'Password must include at least one number'
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTableList = async (req, res) => {
    try {
        const userId = req.params.id;
        const { tableNumber } = req.body;

        if (!userId || !tableNumber) {
            return res.status(400).json({ message: 'User ID and Table Number are required' });
        }

        const parsedTableNumber = parseInt(tableNumber, 10);
        if (isNaN(parsedTableNumber) || parsedTableNumber <= 0) {
            return res.status(400).json({ message: 'Invalid table number provided' });
        }

        const tableNumbers = Array.from({ length: parsedTableNumber }, (_, i) => i + 1);

        const newTable = await User.findByIdAndUpdate(
            { _id: userId },
            { tableList: tableNumbers },
            { new: true, upsert: true }
        );

        res.status(200).json({ newTable, success: true, message: "Table List added successfully" });
    } catch (error) {
        console.error("Error creating table list:", error);
        res.status(500).json({ error, message: error.message });
    }
}

exports.getUserData = async (req, res) => {
    try {
        const userId = req.user.id
        const data = await User.findById(userId)

        if (!data) return res.status(404).json({ error: 'No User found' });

        res.status(200).json({
            message: 'USer data retrieved successfully',
            success: true,
            data
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
