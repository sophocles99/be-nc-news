const articleRouter = require("express").Router();
const {
  getArticles,
  postArticle,
  getArticle,
  patchArticle,
  removeArticle,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/articles.controllers");

articleRouter.get("/", getArticles);

articleRouter.post("/", postArticle);

articleRouter.get("/?query", getArticles);

articleRouter.get("/:article_id", getArticle);

articleRouter.patch("/:article_id", patchArticle);

articleRouter.delete("/:article_id", removeArticle);

articleRouter.get("/:article_id/comments", getCommentsByArticleId);

articleRouter.post("/:article_id/comments", postCommentByArticleId);

module.exports = articleRouter;
