const controller = require("../controllers/tree.controller");

module.exports = function (app) {
    app.get("/allTrees", controller.allTrees);
};
