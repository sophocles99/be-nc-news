const { selectUsers, selectUserByUsername } = require("../models/users.models");
const { checkExists } = require("../models/check-exists.models");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  const promises = [
    selectUserByUsername(username),
    checkExists("users", "username", username),
  ];
  Promise.all(promises)
    .then((responses) => {
      const user = responses[0];
      res.status(200).send({ user });
    })
    .catch(next);
};
