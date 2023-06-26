
exports.handleCustomErrors = (err, req, res, next) => {
  if (err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next();
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  next(err);
};