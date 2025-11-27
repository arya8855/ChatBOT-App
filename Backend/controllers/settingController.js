const { CustomError } = require('../middleware/errorMiddleware');
const ChatbotSettings = require('../models/chatBotSetting');

async function loadDefaultSettings() {
    try {
        const defaults = new ChatbotSettings({
            headerColor: "#33475B",
            backgroundColor: "#EEEEEE",
            customizedMessages: ["How can I help you?", "Ask me anything!"],
            formPlaceholder: {
                name: "Your name",
                phone: "+1 (000) 000-0000",
                email: "example@gmail.com",
                submitButton: "Thank You!",
            },
            welcomeMessage:
                "👋 Want to chat? I'm a chatbot here to help you find your way.",
            missedChatTimer: {
                hour: 1,
                minute: 0,
                second: 0,
            },
        });

        await defaults.save();
        return true;
    } catch (error) {
        console.error("Error saving default settings:", error);
        return false;
    }
}

// Get Chatbot Settings
const getBotSettings = async (req, res, next) => {
    try {
        let data = await ChatbotSettings.find();

        // If no settings exist → load default settings
        if (!data || data.length === 0) {
            await loadDefaultSettings();
            return next(new CustomError("Settings not found. Please retry!", 500));
        }

        const settings = data[0];

        const response = {
            headerColor: settings.headerColor,
            backgroundColor: settings.backgroundColor,
            customizedMessages: settings.customizedMessages,
            formPlaceholder: {
                name: settings.formPlaceholder.name,
                email: settings.formPlaceholder.email,
                phone: settings.formPlaceholder.phone,
                submitButton: settings.formPlaceholder.submitButton,
            },
            welcomeMessage: settings.welcomeMessage,
            missedChatTimer: {
                hour: settings.missedChatTimer.hour,
                minute: settings.missedChatTimer.minute,
                second: settings.missedChatTimer.second,
            },
        };

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// Update Chatbot Settings
const putChatBotSettings = async (req, res, next) => {
    const {
        headerColor,
        backgroundColor,
        customizedMessages,
        formPlaceholder,
        welcomeMessage,
        missedChatTimer,
    } = req.body;

    // Validate input
    if (
        !headerColor ||
        !backgroundColor ||
        !customizedMessages ||
        !formPlaceholder ||
        !welcomeMessage ||
        !missedChatTimer
    ) {
        return next(new CustomError("Please provide all fields", 400));
    }

    try {
        const updatedSettings = await ChatbotSettings.findOneAndUpdate(
            {},
            {
                headerColor,
                backgroundColor,
                customizedMessages,
                formPlaceholder: {
                    name: formPlaceholder.name || "Your name",
                    email: formPlaceholder.email || "example@gmail.com",
                    phone: formPlaceholder.phone || "+1 (000) 000-0000",
                    submitButton: formPlaceholder.submitButton || "Thank You!",
                },
                welcomeMessage:formPlaceholder.welcomeMessage ||
                    "👋 Want to chat? I'm a chatbot here to help you find your way.",
                missedChatTimer: {
                    hour: missedChatTimer.hour,
                    minute: missedChatTimer.minute,
                    second: missedChatTimer.second,
                },
            },
            { new: true, upsert: false }
        );

        if (!updatedSettings) {
            await loadDefaultSettings();
            return next(
                new CustomError("Something went wrong. Please retry!", 500)
            );
        }

        return res
            .status(200)
            .json({ message: "Chatbot settings updated successfully!" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loadDefaultSettings,
    getBotSettings,
    putChatBotSettings,
};