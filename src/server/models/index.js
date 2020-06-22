const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.log = require("./log.model");
db.tree = require("./tree.model");

module.exports = db;
