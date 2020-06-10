const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.tree = require("./tree.model");

db.ROLES = ["user"];

module.exports = db;
