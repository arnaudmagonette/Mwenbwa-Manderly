/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import path from "path";

const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 12345;

// Middleware
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/api", (req, res) => {
    res.json("API Working");
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});
