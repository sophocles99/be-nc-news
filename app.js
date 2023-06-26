const express = require("express");
const app = express();
const { getApi } = require("./controllers/api.controllers");
const { getTopics } = require("./controllers/topics.controllers");
const { getArticleById } = require("./controllers/articles.controllers");
const { handleCustomErrors, handleServerErrors, handlePsqlErrors } = require("./errors");

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getArticleById);

app.use(handlePsqlErrors)

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
