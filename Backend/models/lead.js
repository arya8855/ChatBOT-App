const mongoose = require('mongoose');
const Message = require('./message');

const leadSchema = new mongoose.Schema({
    ticketID: { type: String, required: true },
    userName: { type: String },
    userEmail: { type: String },
    userPhone: { type: String },
    isMissedChat: { type: Boolean, default: false },
    responseTime: { type: Number, default: 0},
    currentAssignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    assigneeList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }],
    isFirstMessageShared: { type: Boolean, default: false },
    isDetailShared: { type: Boolean, default: false },
    status: {
        type: String, 
        enum: ['resolved', 'unresolved'],
        default: 'unresolved',
    },
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);

leadSchema.pre('deleteOne', {document: true, query: false}, async function (next){
    const lead = this;
    try{
        await Message.deleteMany({leadID: lead._id});
        console.log(`Deleted Lead ${lead._id}`);
        next();
    }catch(error){
        next(error);
    }
})

module.exports = Lead;