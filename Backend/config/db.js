const mongoose = require('mongoose');
const settingController = require('../controllers/settingController');
const ChatbotSettings = require('../models/chatBotSetting');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);

        const settingsCount = await ChatbotSettings.countDocuments();
        
        // If the Settings Count is zero, create default settings
        if (settingsCount === 0) {
            const response = await settingController.loadDefaultSettings();
            if (!response) return;
            console.log('Default Settings created successfully');
        }
        mongoose.connection.emit('connected');
        console.log('MongoDB connected successfully');
    }catch(err){
        console.log('Error connecting Mongodb', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;