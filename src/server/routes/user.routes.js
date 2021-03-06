const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
        );
        next();
    });

    app.post("/api/deleteUserAndTrees", controller.deleteUserAndTrees);

    app.get("/api/allUsers", controller.allUsers);

    app.post("/api/getUser", controller.getUser);
};
