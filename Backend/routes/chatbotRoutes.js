const express = require('express');
const settingController = require('../controllers/settingController');
const chatController = require('../controllers/chatController');
const leadController = require('../controllers/leadController');
const isAuthenticate = require('../middleware/isAuthenticate');
const router = express.Router();


// Chatbot Settings
router.get("/bot-settings", settingController.getBotSettings);
router.put("/bot-settings", isAuthenticate, settingController.putChatBotSettings);

// Analytics
router.get("/analytics", isAuthenticate, leadController.getLeadsAnalytics);

// Tickets (Admin / Team)
router.get("/ticket", isAuthenticate, chatController.getLeadList);
router.put("/ticket/status", isAuthenticate, chatController.putStatusUpdate);

router.get("/ticket/assignee/:ticketID", isAuthenticate, chatController.getAssigneeList);
router.put("/ticket/assignee/:ticketID", isAuthenticate, chatController.putLeadAssignee);

router.get("/ticket/:ticketID", isAuthenticate, chatController.getLeadDetails);
router.put("/ticket/:ticketID", isAuthenticate, chatController.putMessage);

// Ticket List (Main Dashboard)
router.get("/", isAuthenticate, chatController.getTicketList);

module.exports = router;