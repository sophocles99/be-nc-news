const db = require("../db/connection");

exports.selectArticles = (topic, sort_by = "created_at", order = "DESC") => {
  const validSortBy = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "article_img_url",
  ];
  if (!validSortBy.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  const validOrder = ["ASC", "DESC"];
  order = order.toUpperCase();
  if (!validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  const queryParams = [];
  let queryString = `SELECT articles.author, articles.title, article_id, topic,
  articles.created_at, articles.votes, article_img_url, 
  COUNT (comment_id) AS comment_count
  FROM articles
  LEFT JOIN comments USING (article_id) `;
  if (topic) {
    queryString += `WHERE topic = $1 `;
    queryParams.push(topic);
  }
  queryString += `GROUP BY article_id
  ORDER BY ${sort_by} ${order};`
  return db.query(queryString, queryParams).then(({ rows }) => {
    return rows;
  });
};

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

exports.selectCommentsByArticleId = (articleId) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body, article_id
       FROM comments
       WHERE article_id = $1
       ORDER BY created_at DESC;`,
      [articleId]
    )
    .then(({ rows }) => rows);
};

exports.insertCommentByArticleId = (article_id, newComment) => {
  const { body, username } = newComment;
  return db
    .query(
      `INSERT INTO comments
                  (body, article_id, author)
                  VALUES ($1, $2, $3)
                  RETURNING *;`,
      [body, article_id, username]
    )
    .then(({ rows }) => rows[0]);
};

exports.updateArticle = (article_id, newVote) => {
  const { inc_votes } = newVote;
  return db
    .query(
      `UPDATE articles
          SET votes = votes + $1
          WHERE article_id = $2
          RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => rows[0]);
};
