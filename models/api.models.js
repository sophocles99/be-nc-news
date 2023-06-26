const { log } = require("console");
const fs = require("fs/promises");

exports.selectApi = () => {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8").then((fileData) => JSON.parse(fileData));
};
