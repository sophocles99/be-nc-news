const fs = require("fs/promises");

exports.getApi = (req, res, next) => {
  fs.readFile(`${__dirname}/../endpoints.json`, "utf-8")
    .then((fileData) => JSON.parse(fileData))
    .then((endpoints) => {
      res.status(200).send({ endpoints });
    })
    .catch(next);
};
