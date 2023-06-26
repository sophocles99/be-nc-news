const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controllers");
const { handleCustomErrors } = require("./errors");

app.get("/api/topics", getTopics);

app.use(handleCustomErrors);

module.exports = app;
