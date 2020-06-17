const controller = require("../controllers/tree.controller");

module.exports = function (app) {
    app.get("/api/allTrees", controller.allTrees);
};

module.exports = function (app) {
    app.get("/api/buyTree", controller.buyTree);
};
