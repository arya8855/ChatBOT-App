const { CustomError } = require('../middleware/errorMiddleware');
const ChatbotSettings = require('../models/chatBotSetting');
const Message = require('../models/message');
const Lead = require('../models/lead');
const User = require('../models/user');
const getReqUser = require('../utils/reqUser');

// Get Ticket List
const getTicketList = async (req, res, next) => {
    try {
        const foundUser = await getReqUser(req, res, next);

        // Build query (all tickets assigned to this user)
        const query = {
            $or: [
                { currentAssignee: foundUser._id },
                { assigneeList: foundUser._id },
            ],
        };

        // Filter by status if needed
        const { status = "All" } = req.query;
        if (status !== "All") {
            query.status = status;
        }

        // Find ALL leads
        const foundLeads = await Lead.find(query)
            .sort({ createdAt: -1 });

        // Build final list
        const finalList = await Promise.all(
            foundLeads.map(async (ticket) => {
                const latestMsg = await Message.findOne({
                    leadID: ticket._id,
                    sendBy: "Lead",
                }).sort({ createdAt: -1 });

                return {
                    // leadID: ticket._id,
                    // ticketID: ticket.ticketID,
                    // latestMessage: latestMsg?.message || "No message",
                    // postedAt: ticket.createdAt,
                    // senderDetails: {
                    //     name: ticket.userName || "N/A",
                    //     email: ticket.userEmail || "N/A",
                    //     phone: ticket.userPhone || "N/A",
                    // },
                    // status: ticket.status,
                    leadID: ticket._id,
                    ticketID: ticket.ticketID,
                    latestMessage: latestMsg?.message || "No message",
                    postedAt: ticket.createdAt,
                    userName: ticket.userName,
                    userPhone: ticket.userPhone,
                    userEmail: ticket.userEmail,
                    status: ticket.status,
                    currentAssignee: ticket.currentAssignee,
                };
            })
        );

        return res.status(200).json({
            total: finalList.length,
            leadsList: finalList
        });

    } catch (error) {
        next(error);
    }
};

// Get All Leads
const getLeadList = async(req, res, next) => {
    try{
        const foundUser = await getReqUser(req, res, next);
        await foundMissedChats(next);

        const query =
            foundUser.userRole === "Admin" ? {} : { assigneeList: foundUser._id };
        
        const foundLeads = await Lead.find(query)
            .populate("currentAssignee")
            .populate("assigneeList")
            .sort({ createdAt: 1 });
            
        const finalList = await Promise.all(
            foundLeads.map(async (lead) => {
                const latestMsg = await Message.findOne({
                    leadID: lead._id,
                    sendBy: "Lead"
                }).sort({ createdAt: -1 }); 
                
                 return {
                    leadID: lead._id,
                    ticketID: lead.ticketID,
                    latestMessage: latestMsg?.message || "No message",
                    userName: lead.userName,
                    userPhone: lead.userPhone,
                    userEmail: lead.userEmail,
                    status: lead.status,
                    isMissedChat: lead.isMissedChat,
                    isCurrentAssignee:
                        lead.currentAssignee?._id?.toString() === foundUser._id.toString(),
                    assigneeName:
                        `${lead?.currentAssignee?.firstName} ${lead?.currentAssignee?.lastName}` || "N/A",
                    postedAt: lead.createdAt,
                    assigneeList:
                        lead.assigneeList?.map((user) => ({
                            userID: user._id,
                            userName: `${user.firstName} ${user.lastName}`
                        })) || []
                };
            })
        );

        return res.status(200).json({
           total: finalList.length,
           leadsList: finalList
        });
    } catch (error) {
        next(error);
    }
};

// Get Assignee List for a Ticket
const getAssigneeList = async(req, res, next) => {
    const ticketID = req.params.ticketID;

    try{
        const foundLead = await Lead.findOne({ ticketID });
        if (!foundLead) {
            return next(new CustomError("Lead not found", 404));
        }

        const foundUsers = await User.find({
            _id: { $ne: foundLead.currentAssignee }
        });

        const list =
            foundUsers?.map((user) => ({
                userID: user._id,
                userName: `${user.firstName} ${user.lastName}`
            })) || [];
            
            return res.status(200).json(list);
    }catch(error){
        next(error);
    }
};

// Get Lead Details and All Messages
const getLeadDetails = async(req, res, next) => {
    const ticketID = req.params.ticketID;

    if (!ticketID) {
        return next(new CustomError("Please provide ticket ID", 400));
    }

    try{
        const foundLead = await Lead.findOne({ ticketID });
        if (!foundLead) {
            return next(new CustomError("Lead not found", 404));
        }

        const conversations = await Message.find({
            leadID: foundLead._id
        })
            .populate("assigneeID")
            .sort({ createdAt: 1 });

            const finalData = conversations.map((msg) => ({
            id: msg._id,
            message: msg.message,
            sendBy: msg.sendBy,
            senderName:
                msg.sendBy === "Lead"
                    ? "Lead"
                    : msg.assigneeID?.firstName || "N/A"
        }));
        return res.status(200).json(finalData);

    }catch(error){
        next(error);
    }
};

// Update Ticket Status
const putStatusUpdate = async(req, res, next) => {
    const { leadID, status } = req.body;

    if (!leadID || !status) {
        return next(new CustomError("Please provide all fields", 400));
    }

    try{
        const foundUser = await getReqUser(req, res, next);

        const foundLead = await Lead.findById(leadID);
        if (!foundLead) return next(new CustomError("Lead not found", 404));

        if (foundLead.currentAssignee.toString() !== foundUser._id.toString()) {
            return next(
                new CustomError("Only current assignee can update status", 401)
            );
        }
        foundLead.status = status;
        await foundLead.save();

        return res.status(200).json({ message: "Status updated successfully" });
    }catch(error){
        next(error);
    }
};

// Change Lead Assignee (Admin Only)
// const putLeadAssignee = async (req, res, next) => {
//     const { leadID, assigneeID } = req.body;

//     if (!leadID || !assigneeID) {
//         return next(new CustomError("Please provide all fields", 400));
//     }

//     try {
//         const foundUser = await getReqUser(req, res, next);

//         const admin = await User.findOne({ userRole: "Admin" });
//         if (!admin) return next(new CustomError("No Admin found", 400));

//         if (foundUser._id.toString() !== admin._id.toString()) {
//             return next(
//                 new CustomError("Only admin can change assignee", 401)
//             );
//         }

//         const lead = await Lead.findById(leadID);
//         if (!lead) return next(new CustomError("Lead not found", 404));

//         const assignee = await User.findById(assigneeID);
//         if (!assignee) return next(new CustomError("Assignee not found", 404));

//         lead.currentAssignee = assignee._id;
//         lead.assigneeList.unshift(assignee._id);

//         await lead.save();

//         return res
//             .status(200)
//             .json({ message: "Assignee updated successfully" });
//     } catch (error) {
//         next(error);
//     }
// };
const putLeadAssignee = async (req, res, next) => {
    try {
        const ticketID = req.params.ticketID;
        const { assigneeID } = req.body;

        const user = await getReqUser(req, res, next);

        const admin = await User.findOne({ userRole: "Admin" });
        if (!admin || user._id.toString() !== admin._id.toString()) {
            return next(new CustomError("Only admin can assign leads", 403));
        }

        const lead = await Lead.findOne({ ticketID });
        if (!lead) return next(new CustomError("Lead not found", 404));

        lead.currentAssignee = assigneeID;
        lead.assigneeList.unshift(assigneeID);
        await lead.save();

        res.json({ message: "Lead assigned successfully" });
    } catch (error) {
        next(error);
    }
};

// Send Message (Member Only)
const putMessage = async (req, res, next) => {
    const { ticketID } = req.params;
    const { message } = req.body;

    if (!ticketID || !message) {
        return next(new CustomError("Please provide all fields", 400));
    }

    try {
        const foundUser = await getReqUser(req, res, next);
        const foundLead = await Lead.findOne({ ticketID });

        if (!foundLead) return next(new CustomError("Lead not found", 404));

        if (foundLead.currentAssignee.toString() !== foundUser._id.toString()) {
            return next(
                new CustomError("Only current assignee can send messages", 401)
            );
        }

        // Response time logic
        const now = new Date();
        const isFirstMessage = foundLead.responseTime === 0;
        const responseMs = now - foundLead.createdAt;

        if (isFirstMessage) {
            foundLead.responseTime = Math.floor(responseMs / 1000);
        }

        const settings = await ChatbotSettings.findOne();
        if (!settings)
            return next(new CustomError("Chatbot settings not found", 404));

        const { hour = 0, minute = 0, second = 0 } =
            settings.missedChatTimer || {};

        const missedMs = (hour * 3600 + minute * 60 + second) * 1000;

        if (missedMs > 0 && responseMs > missedMs) {
            foundLead.isMissedChat = true;
        }

        await foundLead.save();

        // Save message
        const newMessage = new Message({
            leadID: foundLead._id,
            message,
            sendBy: "Member",
            assigneeID: foundUser._id
        });

        await newMessage.save();

        return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        next(error);
    }
};

//Mark missed chat
const foundMissedChats = async (next) => {
    try {
        const settings = await ChatbotSettings.findOne();
        if (!settings)
            return next(new CustomError("Chatbot settings not found", 404));

        const { hour = 0, minute = 0, second = 0 } =
            settings.missedChatTimer || {};

        const missedMs = (hour * 3600 + minute * 60 + second) * 1000;

        if (missedMs > 0) {
            const threshold = new Date(Date.now() - missedMs);

            await Lead.updateMany(
                {
                    responseTime: 0,
                    isMissedChat: false,
                    createdAt: { $lt: threshold }
                },
                { $set: { isMissedChat: true } }
            );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTicketList,
    getLeadList,
    getLeadDetails,
    putStatusUpdate,
    putLeadAssignee,
    getAssigneeList,
    putMessage
};