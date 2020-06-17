const controller = require("../controllers/tree.controller");

module.exports = function (app) {
    app.get("/api/allTrees", controller.allTrees);

    app.post("/api/buyTree", controller.buyTree);
};
