const jwt = require("jsonwebtoken");
require("dotenv").config();

const { ACCESS_TOKEN_SECRET } = process.env;

// Generate Access Token
const generateJWTToken = (user, expiresIn = "2h") => {
    return jwt.sign(
        { id: user._id, role: user.userRole },
        ACCESS_TOKEN_SECRET,
        { expiresIn }
    );
};

// Verify Access Token
const verifyJWTToken = (token) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

module.exports = {
    generateJWTToken,
    verifyJWTToken
};
