const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

const userRoutes = require("./src/routes/user.router")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;