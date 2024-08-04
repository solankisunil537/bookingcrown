const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobilenu: {
        type: Number,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
        required: true,
    },
    businessName: {
        type: String,
        require: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    tableList: {
        type: [Number],
        default: []
    },
    userType: {
        type: String,
        enum: ['default', 'premium', 'non-premium'],
        default: 'default',
    }
}, { timestamps: true });

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare entered password with hashed password
// UserSchema.methods.matchPassword = function (enteredPassword) {
//     return bcrypt.compare(enteredPassword, this.password);
// };


const User = mongoose.model('User', UserSchema);

module.exports = User;
