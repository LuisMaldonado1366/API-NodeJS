require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const dbConnectNoSQL = require("./config/mongo");
const { dbConnectSQL } = require("./config/mysql");
const loggerStream = require("./utils/handleLogs");
const app = express();

const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (request, response) {
    return response.statusCode < 400;
  },
});

const port = process.env.PORT || 3000;

// Here goes the invokes to routes.
//todo  localhosat/api/*
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Your app is up and running on: http://localhost:${port}`);
});

(ENGINE_DB === "nosql") ? dbConnectNoSQL() :  dbConnectSQL();
