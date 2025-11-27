const { CustomError } = require('../middleware/errorMiddleware');
const Message = require('../models/message');
const Lead = require('../models/lead');
const User = require('../models/user');

// Generate New Ticket ID
async function getTicketID() {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");

    const base = `${year}-${month}${day}`;
    let ticketID = base;

    let count = 1;
    let exists = await Lead.findOne({ ticketID });

    while (exists) {
        const suffix = `${count}`.padStart(2, "0");
        ticketID = `${base}-${suffix}`;
        exists = await Lead.findOne({ ticketID });
        count++;
    }

    return ticketID;
}

// Get Lead Details (used by public user)
const getLeadsDetails = async (req, res, next) => {
    const { leadID } = req.params;

    if (!leadID) {
        return next(new CustomError("Invalid Lead ID", 400));
    }

    try {
        const foundLead = await Lead.findById(leadID);
        if (!foundLead) {
            return next(new CustomError("Lead not found", 404));
        }

        const conversation = await Message
            .find({ leadID })
            .sort({ createdAt: 1 });

        const result = {
            leadID: foundLead._id,
            userName: foundLead.userName,
            userPhone: foundLead.userPhone,
            userEmail: foundLead.userEmail,
            isFirstMessageShared: foundLead.isFirstMessageShared,
            detailsShared: foundLead.isDetailShared,
            status: foundLead.status,
            conversation: conversation?.map((msg) => ({
                id: msg._id,
                message: msg.message,
                sendBy: msg.sendBy
            })) || []
        };

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// Create New Lead (first message from user)
const postNewLead = async (req, res, next) => {
    const { message } = req.body;

    if (!message) {
        return next(new CustomError("Message is required", 400));
    }

    try {
        const admin = await User.findOne({ userRole: "Admin" });
        if (!admin) {
            return next(new CustomError("No Admin found", 401));
        }

        const ticketID = await getTicketID();

        const newLead = new Lead({
            ticketID,
            currentAssignee: admin._id,
            assigneeList: [admin._id],
            isFirstMessageShared: true,
            isDetailShared: false
        });

        await newLead.save();
        const conversation = new Message({
            leadID: newLead._id,
            message,
            sendBy: "Lead"
        });

        await conversation.save();

        return res.status(200).json({ leadID: newLead._id });
    } catch (error) {
        next(error);
    }
};

// User Submits Lead Form
const postLeadForm = async (req, res, next) => {
    const { leadID, name, email, phone } = req.body;

    if (!leadID || !name || !email || !phone) {
        return next(new CustomError("Please provide all details", 400));
    }

    try {
        const lead = await Lead.findById(leadID);
        if (!lead) {
            return next(new CustomError("Lead not found", 404));
        }

        lead.userName = name.trim();
        lead.userEmail = email.trim();
        lead.userPhone = phone.trim();
        lead.isDetailShared = true;

        await lead.save();

        return res.status(200).json({ message: "Lead details updated successfully!" });
    } catch (error) {
        next(error);
    }
};

// User Sends Message
const putLeadMessage = async (req, res, next) => {
    const { leadID, message } = req.body;

    if (!leadID || !message) {
        return next(new CustomError("Please provide all details", 400));
    }

    try {
        const lead = await Lead.findById(leadID);
        if (!lead) {
            return next(new CustomError("Lead not found", 404));
        }

        const newMessage = new Message({
            leadID,
            message,
            sendBy: "Lead"
        });

        await newMessage.save();

        return res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        next(error);
    }
};

// Analytics
function getWeekNumber(date) {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = (date - start) / (1000 * 60 * 60 * 24);
    return Math.ceil((diff + start.getDay() + 1) / 7);
}

const getLeadsAnalytics = async (req, res, next) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const resolvedLeads = await Lead.countDocuments({ status: "Resolved" });

        const resolvedPercentage =
            totalLeads === 0 ? 0 : Math.round((resolvedLeads / totalLeads) * 100);

        const leads = await Lead.find();

        // Average response time
        let avgResponseTime = 0;
        const responseData = leads.reduce(
            (acc, lead) => {
                if (lead.responseTime > 0) {
                    acc.sum += lead.responseTime;
                    acc.count++;
                }
                return acc;
            },
            { sum: 0, count: 0 }
        );

        if (responseData.count > 0) {
            avgResponseTime = Math.round(responseData.sum / responseData.count);
        }

        // Missed chat graph (last 10 weeks)
        const missedChatLeads = leads.filter((l) => l.isMissedChat);
        const currentYear = new Date().getFullYear();
        const graph = Array(10).fill(0);
        const currentWeek = getWeekNumber(new Date());

        missedChatLeads.forEach((lead) => {
            const date = new Date(lead.createdAt);
            if (date.getFullYear() === currentYear) {
                const weekNum = getWeekNumber(date);
                const diff = currentWeek - weekNum;

                if (diff >= 0 && diff < 10) {
                    graph[9 - diff] += 1;
                }
            }
        });

        const result = {
            totalLeads,
            totalResolvedLeads: resolvedPercentage,
            averageResponseTime: avgResponseTime,
            leadGraph: graph
        };

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getLeadsDetails,
    postNewLead,
    postLeadForm,
    putLeadMessage,
    getLeadsAnalytics
};