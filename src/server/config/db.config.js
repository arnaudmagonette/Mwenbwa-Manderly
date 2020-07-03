/* eslint-disable no-console */
const mongoose = require("mongoose");

const mongoURI = "mongodb://heroku_2tcbx7hs:tq1onbmtutprq";

const ConnectionMongoDb = async () => {
    try {
        await mongoose.connect(mongoURI, {
            auth: {authSource: "admin"},
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = ConnectionMongoDb;
