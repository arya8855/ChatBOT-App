const { CustomError } = require("../middleware/errorMiddleware");
const User = require("../models/user");

const getReqUser = async (req, res, next) => {
    try {
        const userId = req?.user?.id;

        if (!userId) {
            return next(new CustomError("Unauthorized: No user ID found", 401));
        }

        const foundUser = await User.findById(userId);

        if (!foundUser) {
            return next(new CustomError("Unauthorized: User not found", 401));
        }

        return foundUser;
    } catch (error) {
        return next(error);
    }
};

module.exports = getReqUser;
