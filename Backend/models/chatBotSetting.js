const mongoose = require('mongoose');

const chatSettingSchema = new mongoose.Schema({
    headerColor: {
        type: String,
        default:'#33475B',
    },
    backgroundColor: { type: String, default: '#EEEEEE'},
    customizedMessages: {
        type: [String],
        required: true,
        default: [],
    },
    formPlaceholder: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        submitButton: { type: String },
    },
    welcomeMessage: { type: String },
    missedChatTimer: {
        hour: { type: Number },
        minute: { type: Number},
        second: { type: Number},
    },
}, {timestamps: true});

const ChatbotSettings = mongoose.model('ChatbotSettings', chatSettingSchema);
module.exports = ChatbotSettings;