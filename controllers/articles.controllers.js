const {
  insertCommentByArticleId,
  insertArticle,
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  updateArticle,
} = require("../models/articles.models");
const { checkExists } = require("../models/check-exists.models");

exports.getArticles = (req, res, next) => {
  const { topic, sort_by, order, limit, p } = req.query;
  const promises = [selectArticles(topic, sort_by, order, limit, p)];
  if (topic) {
    promises.push(checkExists("topics", "slug", topic));
  }
  Promise.all(promises)
    .then((responses) => {
      const articles = responses[0];
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  const { newArticle } = req.body;
  insertArticle(newArticle)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { limit, p } = req.query;
  const promises = [
    selectCommentsByArticleId(article_id, limit, p),
    checkExists("articles", "article_id", article_id),
  ];
  Promise.all(promises)
    .then((responseArray) => {
      const comments = responseArray[0];
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { newComment } = req.body;
  insertCommentByArticleId(article_id, newComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { newVote } = req.body;
  const promises = [
    updateArticle(article_id, newVote),
    checkExists("articles", "article_id", article_id),
  ];
  Promise.all(promises)
    .then((responses) => {
      const article = responses[0];
      res.status(200).send({ article });
    })
    .catch(next);
};
