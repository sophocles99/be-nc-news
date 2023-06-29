const apiRouter = require("express").Router();
const { getApi } = require("../controllers/api.controllers");
const articleRouter = require("./article-router");
const commentRouter = require("./comment-router");
const topicRouter = require("./topic-router");
const userRouter = require("./user-router")

apiRouter.use("/articles", articleRouter);

apiRouter.use("/comments", commentRouter);

apiRouter.use("/topics", topicRouter);

apiRouter.use("/users", userRouter);

apiRouter.get("/", getApi);

module.exports = apiRouter;
