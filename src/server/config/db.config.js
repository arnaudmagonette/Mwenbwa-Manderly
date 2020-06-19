/* eslint-disable no-console */
const mongoose = require("mongoose");
// const mongoURI = process.env.MONGOLAB_URI;

const ConnectionMongoDb = async () => {
    try {
        await mongoose.connect(
            "mongodb://heroku_2tcbx7hs:tq1onbmtutprqoq5ssb4mboqpi@ds249967.mlab.com:49967/heroku_2tcbx7hs",
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
        );
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = ConnectionMongoDb;
