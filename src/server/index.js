/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import express from "express";
import path from "path";
import {addIdleLeaves, removeIdleLeaves} from "./controllers/user.controller";

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

const ConnectionMongoDb = require("./config/db.config");

// Routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/tree.routes")(app);
require("./routes/log.routes")(app);

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

// heroku
// const server_port = process.env.YOUR_PORT || process.env.PORT || 8080;
// const server_host = process.env.YOUR_HOST || "0.0.0.0";
// app.listen(server_port, server_host, () => {
//     console.log("Listening on port %d", server_port);
// });

// Connection Mongo Db
ConnectionMongoDb();

//------------------------------

//addIdleLeaves();
//removeIdleLeaves();

//-------------------------------
