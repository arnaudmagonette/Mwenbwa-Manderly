/* eslint-disable no-console */
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI || "mongodb://dev:dev@mongo/mwenbwaDb";

const ConnectionMongoDb = async () => {
    try {
        await mongoose.connect(mongoURI, {
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
