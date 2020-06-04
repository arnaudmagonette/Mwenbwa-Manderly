/* eslint-disable no-console */

import express from "express";
import path from "path";

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {APP_PORT} = process.env;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, "../../bin/client")));

const Trees = require("./models/trees");

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

// Connection

const url = "mongodb://mongo:27017/mwenbwaDb";

mongoose.connect(url, {
    auth: {authSource: "admin"},
    user: "dev",
    pass: "dev",
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
    console.log("Connection a la Db Ok");
});

db.on("error", err => {
    console.error("connection Error:", err);
});

//------------------------------

// Routage

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

//------------------------------

const totalLeaves = 100;
const totalPlayers = 4;

let leavesUser = Math.floor(totalLeaves / totalPlayers);

function addLeaves() {
    Trees.find({owner: "Arnaud"}).exec((err, allTrees) => {
        if (err) {
            console.error(err);
        }

        let totalLeavesTrees = 0;

        allTrees.forEach(tree => {
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
}

addLeaves();
removeLeaves();
buyTree();
