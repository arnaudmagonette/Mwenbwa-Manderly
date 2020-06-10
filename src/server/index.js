/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import path from "path";
import Cookies from "universal-cookie";

const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const auth = require("./middleware/auth");
const InitiateMongoServer = require("./config/db");
const cookies = new Cookies();

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 12345;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
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

app.get("/api/secret", auth, (req, res) => {
    res.send("The password is potato");
});
app.get("/hello", auth, (req, res) => {
    cookies.get("token");
    res.send("The password is potato");
});

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});
