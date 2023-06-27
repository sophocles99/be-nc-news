const { convertTimestampToDate } = require("../db/seeds/utils");

exports.prepareNewComment = (articleId, commentPost) => {
  const newComment = { ...commentPost };
  newComment.author = newComment.username;
  delete newComment.username;
  newComment.article_id = articleId;
  newComment.votes = 0;
  newComment.created_at = Date.now();

  const formattedNewComment = convertTimestampToDate(newComment);
  return formattedNewComment;
};
