const db = require("../db/connection");

exports.updateComment = (commentId, newVote) => {
  const { inc_votes } = newVote;
  return db
    .query(
      `UPDATE comments
       SET votes = votes + $1
       WHERE comment_id = $2
       RETURNING *;`,
      [inc_votes, commentId]
    )
    .then(({ rows }) => rows[0]);
};

exports.deleteComment = (commentId) => {
  return db
    .query(
      `DELETE FROM comments
     WHERE comment_id = $1
     RETURNING *;`,
      [commentId]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    });
};
