/* eslint-disable no-console */
const mongoose = require("mongoose");

// const mongoURI = process.env.MONGODB_URI;

const ConnectionMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
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
