const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const treesSchema = new Schema(
    {
        name: {type: String, default: "For sale"},
        leaves: Number,
        sci_name: String,
        geoloc: {
            lat: Number,
            lon: Number,
        },
        owner: [{type: String, default: "For sale"}],
        comments: [
            {
                name: String,
                comment: String,
            },
        ],
        lock: {type: Boolean, default: false},
    },
    {collection: "trees"},
);

module.exports = mongoose.model("Trees", treesSchema);
