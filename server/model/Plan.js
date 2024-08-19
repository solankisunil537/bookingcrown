const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planType: { type: String, require: true, enum: ["Basic", "Premium"] },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
    amount: { type: Number, require: true }
}, { timestamps: true });

module.exports = mongoose.model('Plan', PlanSchema);
