const express = require("express");
const { getApi } = require("./controllers/api.controllers");
const { handleServerErrors } = require("./errors");
const app = express();

app.get("/api", getApi);

app.use(handleServerErrors)

module.exports = app;
