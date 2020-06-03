/* eslint-disable no-console */
const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb://dev:dev@mongo/mwenbwaDb";

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,
        });
        console.log("Connected to DB !!");
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;
