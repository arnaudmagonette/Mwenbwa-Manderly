/* eslint-disable no-console */
const mongoose = require("mongoose");

const mongoURI =
    "mongodb://becode:2tcbx7hs@ds249967.mlab.com:49967/heroku_2tcbx7hs";

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
