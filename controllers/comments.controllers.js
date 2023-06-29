const { checkExists } = require("../models/check-exists.models");
const { deleteComment, updateComment } = require("../models/comments.models");

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { newVote } = req.body;
  const promises = [
    updateComment(comment_id, newVote),
    checkExists("comments", "comment_id", comment_id),
  ];
  Promise.all(promises)
    .then((responses) => {
      const comment = responses[0];
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
