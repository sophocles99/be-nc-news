const db = require("../db/connection");

exports.selectArticleById = (articleId) => {
  return db
    .query(
      `SELECT author, title, article_id, body, topic, created_at, votes, article_img_url
       FROM articles
       WHERE article_id = $1`,
      [articleId]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return rows[0];
    });
};

exports.selectArticles = () => {
  return db
    .query(
      `SELECT articles.author, articles.title, article_id, topic,
       articles.created_at, articles.votes, article_img_url, 
       COUNT (comment_id) AS comment_count
       FROM articles
       LEFT JOIN comments USING (article_id)
       GROUP BY article_id
       ORDER BY created_at DESC;`
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectCommentsByArticleId = (articleId) => {
  return db
  .query(
    `SELECT comment_id, votes, created_at, author, body, article_id
    FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;`,
    [articleId]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return rows;
    });
};
