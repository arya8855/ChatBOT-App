const mongoose = require('mongoose');
const Lead = require('./lead');
const Message = require('./message');

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true, 
        trim: true
    },
    lastName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    },
    contact: { 
        type: String, 
        trim: true
    },
    password: { 
        type: String, 
        required: true 
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    userRole: {
        type: String,
        enum: ['Admin', 'Member'],
        default:'Member',
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

userSchema.pre('deleteOne', {document: true, query: false}, async function (next) {
    const member = this;
    try{
        // Only allow deleting members
        if (member.userRole !== 'Member') return next();

        const adminUser = await User.findOne({userRole: 'Admin'});
        if (!adminUser) return next(new Error('No admin user found for reassignment'));

        //update currentAssignee
        await Lead.updateMany(
            { currentAssignee: member._id },
            { currentAssignee: adminUser._id }
        )

        //update assineeList
        await Lead.updateMany(
            { assigneeList: member._id },
            {
                $pull: { assigneeList: member._id },
                $addToSet: { assigneeList: adminUser._id },
            }
        );

        //update message assigneeID
        await Message.updateMany(
            { assigneeID: member._id },
            { assigneeID: adminUser._id }
        );
        console.log(`Reassigned leads and conversations from Member ${member._id} to Admin ${admin._id}`);
        next();
    }catch(error){
        next(error);
    }
});

module.exports = User;