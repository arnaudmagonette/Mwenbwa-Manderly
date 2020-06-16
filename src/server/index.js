/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import express from "express";
import path from "path";
import {addIdleLeaves, removeIdleLeaves} from "./controllers/user.controller";

const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const {APP_PORT} = process.env.PORT || process.env;

const corsOptions = {
    origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
app.use(express.static(path.resolve(__dirname, "../../bin/client")));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./models");
const Role = db.role;

const ConnectionMongoDb = require("./config/db.config");

// Routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/tree.routes")(app);

// Routage React
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"), err => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

// Connection Mongo Db
ConnectionMongoDb();

//------------------------------

//addIdleLeaves();
//removeIdleLeaves();

//-------------------------------

/*

function buyTree() {
    Trees.findByIdAndUpdate("5ed10f1a45ab8e02c4ee0532", {
        $push: {owner: ["Arnaud"]},
    }).exec((err, tree) => {
        if (err) {
            console.error(err);
        }

        console.log(tree);
    });
}*/
