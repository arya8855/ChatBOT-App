const bcrypt = require('bcryptjs');
const { CustomError } = require('../middleware/errorMiddleware');
const User = require('../models/user');
const { generateJWTToken } = require('../utils/jwtToken');

//Login
const postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new CustomError("Email and password required", 400));
    }

    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) return next(new CustomError("Invalid credentials", 401));

        const isValid = await bcrypt.compare(password, foundUser.password);
        if (!isValid) return next(new CustomError("Invalid credentials", 401));

        // Generate access token
        const token = generateJWTToken(foundUser, "2h");

        // Save in HttpOnly cookie
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/"
        });

        const userDetail = {
            id: foundUser._id,
            name: foundUser.firstName + " " + foundUser.lastName,
            email: foundUser.email,
            isAdmin: foundUser.userRole === "Admin",
        };

        return res.status(200).json(userDetail);

    } catch (error) {
        next(error);
    }
};


//Register
const postRegister = async (req, res, next) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if(!firstName || !lastName || !email || !password || !confirmPassword){
        return next(new CustomError("Invalid details shared!", 400));
    };

    if (password !== confirmPassword) {
        return next(new CustomError("Passwords do not match!", 400));
    }

    try {
        const foundSimilarUser = await User.findOne({ email });
        if (foundSimilarUser) {
            return next(new CustomError("User already exists!", 400));
        }

        const foundAdmin = await User.findOne({ userRole: "Admin" });
        const userRole = foundAdmin ? "Member" : "Admin";
        const parentID = foundAdmin ? foundAdmin._id : null;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userRole,
            parent: parentID
        });

        await newUser.save();

        return res.status(200).json({ message: "User created successfully" });
    }catch(error){
        return next(error);
    }    
};

//Logout
const getLogout = (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logged out successfully" });
};

//Get Member List
const getMembers = async (req, res, next) => {
    try{
        const foundUsers = await User.find();

        const finalList = foundUsers.map(user => ({
            userId: user._id,
            userName: `${user.firstName} ${user.lastName}` || "N/A",
            userPhone: user.contact || "N/A",
            userEmail: user.email || "N/A",
            userRole: user.userRole,
        }));

        return res.status(200).json(finalList);
    }catch(error){
        next(error);
    }
};

//Get Member Details
const getMemberDetail = async (req, res, next) => {
    const { memberID } = req.params;

    if (!memberID) {
        return next(new CustomError("Something went wrong, try again!", 400));
    }

    try{
        const foundUser = await User.findById(memberID);

        if (!foundUser) {
            return next(new CustomError("Member not found!", 404));
        }

        const userDetails = {
            userID: foundUser._id,
            firstName: foundUser.firstName || "N/A",
            lastName: foundUser.lastName || "N/A",
            email: foundUser.email || "N/A",
            phone: foundUser.contact,
            password: "",
            confirmPassword: "",
        };
        return res.status(200).json(userDetails);
    }catch (error) {
        next(error);
    }
};

//Create new User
const postMember = async (req, res, next) => {
    const { name, email, designation } = req.body;

    if (!name || !email || !designation) {
        return next(new CustomError("Invalid details shared!", 400));
    }

    try {
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return next(new CustomError("User with this email already exists!", 409));
        }

        const foundAdmin = await User.findOne({ userRole: "Admin" });
        if (!foundAdmin) {
            return next(new CustomError("Something went wrong, please try later!", 409));
        }

        const hashedPassword = await bcrypt.hash("User@1234", 10);

        const newUser = new User({
            firstName: name.split(" ")[0],
            lastName: name.split(" ")[1],
            email,
            password: hashedPassword,
            parent: foundAdmin._id,
            userRole: designation,
        });
        await newUser.save();

        return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

//Update Member
const putMemberDetail = async (req, res, next) => {
    const { userID, firstName, lastName, email, phone, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !phone) {
        return next(new CustomError("Invalid fields", 409));
    }

    if (password && password !== confirmPassword) {
        return next(new CustomError("Passwords do not match", 409));
    }

    try {
        const foundMember = await User.findById(userID);
        if (!foundMember) {
            return next(new CustomError("Member not found!", 404));
        }

        if (foundMember.email !== email.trim()) {
            const existingUser = await User.findOne({
                email,
                _id: { $ne: foundMember._id }
            });

            if (existingUser) {
                return next(new CustomError("Email already in use", 409));
            }
        }

        foundMember.firstName = firstName.trim();
        foundMember.lastName = lastName.trim();

        if (foundMember.email !== email.trim() || foundMember.contact !== phone.trim()) {
            foundMember.email = email.trim();
            foundMember.contact = phone.trim();

            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                foundMember.password = hashedPassword;
                foundMember.refresh_token = null;
            }

            await foundMember.save();

            res.clearCookie("access_token");
            res.clearCookie("refresh_token");

            return res.status(440).json({
                message: "Profile updated successfully, please login again"
            });
        }

        await foundMember.save();

        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        next(error);
    }
};

//DELETE MEMBER
const deleteMember = async (req, res, next) => {
    const { memberID } = req.params;

    if (!memberID) {
        return next(new CustomError("Something went wrong, try again!", 409));
    }

    try {
        const validUser = await User.findById(memberID);

        if (!validUser) {
            return next(new CustomError("Member not found!", 404));
        }

        if (validUser.userRole === "Admin") {
            return next(new CustomError("Only members can be deleted!", 401));
        }

        if (validUser.parent.toString() !== req.user.id.toString()) {
            return next(new CustomError("Only admin can delete member!", 401));
        }

        await validUser.deleteOne();

        return res.status(200).json({
            message: "Member has been deleted successfully!"
        });

    } catch (error) {
        next(error);
    }
};

// Update Admin Password********
const updateAdminPassword = async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
        return next(new CustomError("All fields are required", 400));
    }

    if (newPassword !== confirmPassword) {
        return next(new CustomError("New passwords do not match", 400));
    }

    try {
        // Find Admin
        const admin = await User.findOne({ userRole: "Admin" });

        if (!admin) {
            return next(new CustomError("Admin user not found", 404));
        }

        // Check old password
        const isValid = await bcrypt.compare(oldPassword, admin.password);
        if (!isValid) {
            return next(new CustomError("Old password is incorrect", 401));
        }

        // Hash new password
        const hashed = await bcrypt.hash(newPassword, 10);
        admin.password = hashed;
        await admin.save();

        // Clear token cookies so admin logs in again
        res.clearCookie("access_token");

        return res.status(200).json({
            message: "Admin password updated successfully. Please login again."
        });

    } catch (err) {
        next(err);
    }
};


module.exports = {
    getLogout,
    postLogin,
    getMembers,
    postRegister,
    postMember,
    getMemberDetail,
    putMemberDetail,
    deleteMember,
    updateAdminPassword,
};
