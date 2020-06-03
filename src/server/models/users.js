const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        name: {type: String, default: "For sale"},
        leaves: Number,
        sci_name: String,
        geoloc: {
            lat: Number,
            lon: Number,
        },
        owner: [{type: String, default: null}],
        comments: [{type: String, default: null}],
        lock: {type: Boolean, default: false},
    },
    {collection: "users"},
);

module.exports = mongoose.model("Users", usersSchema);
