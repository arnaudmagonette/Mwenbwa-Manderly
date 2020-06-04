/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import express from "express";
import path from "path";

const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const {APP_PORT} = process.env;

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, "../../bin/client")));

const Trees = require("./models/tree");
const Users = require("./models/user");

const user = require("./routes/user");
const ConnectionMongoDb = require("./config/db");

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

// Connection Mongo Db
ConnectionMongoDb();

// Routage

app.get("/", (req, res) => {
    res.json("API Working");
});

app.get("/api/secret", auth, function (req, res) {
    res.send("The password is potato");
});

app.get("/allTrees", (req, res) => {
    Trees.find({})
        .limit(10)
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
});

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

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
