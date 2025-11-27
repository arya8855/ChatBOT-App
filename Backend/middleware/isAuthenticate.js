const { CustomError } = require("./errorMiddleware");
const { verifyJWTToken } = require("../utils/jwtToken");

const isAuthenticate = (req, res, next) => {
    try {
        const token = req.cookies?.access_token;

        if (!token) {
            return next(new CustomError("Unauthorized: No token found", 401));
        }

        try {
            const decoded = verifyJWTToken(token);
            req.user = decoded; // attach user { id, role }
            return next();
        } catch (err) {
            return next(new CustomError("Unauthorized: Invalid or expired token", 401));
        }
    } catch (error) {
        next(error);
    }
};

module.exports = isAuthenticate;
