const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true },
    mobilenu: { type: Number, required: true },
    date: { type: Date, required: true },
    time: {
        start: { type: String },
        end: { type: String }
    },
    totalHours: { type: Number },
    turfOrTable: { type: String, required: true },
    amount: { type: Number, required: true },
    advance: { type: Number, default: 0 },
    pending: { type: Number, default: function () { return this.amount - (this.advance || 0); } },
    payment: { type: String, required: true, default: "pending", enum: ["paid", "partial", "pending"] },
    isCanceled: { type: Boolean, default: false },
    bookingType: {
        type: String,
        enum: ['Full Day', 'Half Day', 'Hourly'],
        required: true
    },
    session: {
        type: String,
        enum: ['Morning Session', 'Afternoon Session', 'Evening Session'],
    }
});

bookingSchema.pre('save', function (next) {
    if (this.advance >= this.amount) {
        this.payment = 'paid';
    } else if (this.advance > 0) {
        this.payment = 'partial';
    } else {
        this.payment = 'pending';
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);
