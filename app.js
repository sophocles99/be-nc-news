const express = require("express");
const { getApi } = require("./controllers/api.controllers");
const { handleServerErrors } = require("./errors");
const app = express();
const { getTopics } = require("./controllers/topics.controllers");
const { handleCustomErrors } = require("./errors");

app.get("/api/topics", getTopics);

app.use(handleCustomErrors);

app.get("/api", getApi);

app.use(handleServerErrors)

module.exports = app;
