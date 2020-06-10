const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.status(403).send({message: "No token provided!"});
        return;
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({message: "Unauthorized!"});
            return;
        }
        req.userId = decoded.id;
        next();
    });
};
const authJwt = {
    verifyToken,
};
module.exports = authJwt;
