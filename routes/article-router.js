const articleRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  postArticle,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticle,
} = require("../controllers/articles.controllers");

articleRouter.get("/", getArticles);

articleRouter.get("/?query", getArticles);

articleRouter.get("/:article_id", getArticleById);

articleRouter.post("/", postArticle)

articleRouter.get("/:article_id/comments", getCommentsByArticleId);

articleRouter.post("/:article_id/comments", postCommentByArticleId);

articleRouter.patch("/:article_id", patchArticle);

module.exports = articleRouter;
