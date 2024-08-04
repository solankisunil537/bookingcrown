const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tableNumbers: {
        type: [Number]
    }
});

module.exports = mongoose.model('Tables', TableSchema);
