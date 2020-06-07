/* eslint-disable no-console */
const jwt = require("jsonwebtoken");

module.exports = function (req, res) {
    const token = req.header("token");
    if (!token) {
        res.status(401).json({message: "Auth Error"});
    }
    try {
        const decoded = jwt.verify(token, "randomString");
        req.user = decoded.user;
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "Invalid Token"});
    }
};
