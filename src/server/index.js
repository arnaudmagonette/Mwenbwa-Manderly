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

//Connection

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
    console.log("Connection Server Ok");
});

db.on("error", err => {
    console.error("connection Error:", err);
});

//------------------------------

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
