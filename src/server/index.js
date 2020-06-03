/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
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

app.get("/", (req, res) => {
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
