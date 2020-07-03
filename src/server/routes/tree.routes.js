const controller = require("../controllers/tree.controller");

module.exports = function (app) {
    app.get("/api/allTrees", controller.allTrees);

    app.post("/api/buyTree", controller.buyTree);

    app.post("/api/reBuyTree", controller.reBuyTree);

    app.post("/api/lockTree", controller.lockTree);

    app.post("/api/howManyTrees", controller.howManyTrees);

    app.post("/api/addComment", controller.addComment);

    app.post("/api/getValueTree", controller.getValueTree);
};
