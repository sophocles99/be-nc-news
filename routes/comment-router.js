const commentRouter = require("express").Router();
const { patchComment, removeComment } = require("../controllers/comments.controllers");

commentRouter.patch("/:comment_id", patchComment)

commentRouter.delete("/:comment_id", removeComment);

module.exports = commentRouter;
