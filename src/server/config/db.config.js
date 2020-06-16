"use strict";

const mongoose = require("mongoose");

// const mongoURI = process.env.MONGODB_URI;
const mongoURI = "mongodb://dev:dev@mongo/mwenbwaD";

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
//# sourceMappingURL=db.js.map
