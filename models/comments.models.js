const db = require("../db/connection");

exports.deleteComment = (commentId) => {
  return db.query(
    `DELETE FROM comments
     WHERE comment_id = $1
     RETURNING *;`,
    [commentId]
  ).then(({rows})=>{
    if (rows.length === 0) {
      return Promise.reject({status: 404, msg: "Not found"})
    }
  })
};
