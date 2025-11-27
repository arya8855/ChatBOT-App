const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    leadID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
        required: true,
    },
    message: { type: String },
    sendBy: {
        type: String,
        enum: ['Lead', 'Member'],
        default: 'Lead',
    },
    assigneeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, { timestamps: true });

const Message = mongoose.model('message', messageSchema);
module.exports = Message;