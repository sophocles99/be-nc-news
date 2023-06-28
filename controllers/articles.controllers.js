const {
  insertCommentByArticleId,
  updateArticle,
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
} = require("../models/articles.models");
const { checkExists } = require("../models/check-exists.models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { topic, sort_by, order } = req.query;
  const promises = [selectArticles(topic, sort_by, order)];
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

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [
    selectCommentsByArticleId(article_id),
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

exports.patchArticleById = (req, res, next) => {
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
