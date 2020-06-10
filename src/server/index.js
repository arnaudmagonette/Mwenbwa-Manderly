/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import express from "express";
import path from "path";

const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const {APP_PORT} = process.env;

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

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

// Connection Mongo Db
ConnectionMongoDb();

// Routage

app.get("/", (req, res) => {
    res.json("API Working");
});

/*app.get("/allTrees", (req, res) => {
    Trees.find({})
        .limit(1000)
        .exec((err, allTrees) => {
            if (err) {
                console.error(err);
            }

            res.json(allTrees);
        });
});

app.get("/allUsers", (req, res) => {
    Users.find({})
        .limit(10)
        .exec((err, allUsers) => {
            if (err) {
                console.error(err);
            }

            res.json(allUsers);
        });
});*/

//-------------------------------

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save(error => {
                if (error) {
                    console.log("error", error);
                }

                console.log("added 'user' to roles collection");
            });
        }
    });
}

//------------------------------

/*const totalLeaves = 100;
const totalPlayers = 4;

let leavesUser = Math.floor(totalLeaves / totalPlayers);

function addLeaves() {
    Trees.find({owner: "Arnaud"}).exec((err, allTrees) => {
        if (err) {
            console.error(err);
        }

        let totalLeavesTrees = 0;

        allTrees.forEach((tree) => {
            totalLeavesTrees += tree.leaves;
        });

        leavesUser = Math.floor(leavesUser + totalLeavesTrees);

        console.log("Add Leaves");
        console.log(leavesUser);
    });

    setTimeout(addLeaves, 900000);
}

function removeLeaves() {
    leavesUser = Math.floor(leavesUser / 2);

    console.log("Remove Leaves");
    console.log(leavesUser);

    setTimeout(removeLeaves, 3600000);
}

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
