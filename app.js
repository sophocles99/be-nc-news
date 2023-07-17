const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routes/api-router");
const {
  handleCustomErrors,
  handleServerErrors,
  handlePsqlErrors,
} = require("./errors");

app.use(cors())

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", (_, res) => {
  res.status(404).send({ msg: "Not found" });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
