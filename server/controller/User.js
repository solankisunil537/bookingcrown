const User = require("../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const Plan = require("../model/Plan");
const JWT_SECRET = process.env.JWT_SECRET

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

        user = new User({
            name,
            email,
            mobilenu,
            businessType,
            businessName,
            address
        });

        await user.save()
        res.status(200).json({ success: true, message: 'Your account has been successfully created.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
}

exports.updateUser = async (req, res) => {
    const userId = req.user.id;
    const { name, email, mobilenu, businessType, businessName, address, itemList } = req.body;

    try {
        if (!name || !email || !mobilenu || !businessType || !businessName || !address || !itemList) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.email = email;
        user.mobilenu = mobilenu;
        user.businessType = businessType;
        user.businessName = businessName;
        user.address = address;
        user.itemList = itemList;

        await user.save();

        res.status(200).json({ success: true, message: 'Your details updated successfully!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password. Please try again later' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password. Please try again later', success: false });
        }

        if (user.role === "user") {
            const plan = await Plan.findOne({ userId: user._id });
            if (!plan || plan.endDate < new Date()) {
                return res.status(403).json({ message: 'Access Denied.', success: false });
            }
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
        if (!data) return res.status(304).json({ message: 'No User found' });
        const userPlan = await Plan.findOne({ userId: userId });
        // if (!userPlan) return res.status(304).json({ message: 'No Plan found' });

        res.status(200).json({
            message: 'User data retrieved successfully',
            success: true,
            data: data,
            plan: userPlan || {}
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const Users = await User.find({ role: "user" });

        if (!Users || Users.length === 0) {
            return res.status(400).json({ message: "No user data found" });
        }

        const allUsers = await Promise.all(Users.map(async (user) => {
            const plan = await Plan.findOne({ userId: user._id }).sort({ createdAt: -1 }).limit(1);
            return {
                ...user._doc,
                planData: plan || null
            };
        }));

        res.status(200).json({
            message: 'User data retrieved successfully',
            success: true,
            allUsers
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};