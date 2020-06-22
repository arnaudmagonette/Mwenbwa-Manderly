const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema(
    {
        playerId: String,
        playerUsername: String,
        playerEmail: String,
        action: String,
        dateTime: {type: Date, default: Date.now},
    },
    {collection: "logs"},
);

module.exports = mongoose.model("Log", logSchema);
