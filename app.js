require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const morganBody = require("morgan-body");
const dbConnectNoSQL = require("./config/mongo");
const { dbConnectSQL } = require("./config/mysql");
const loggerStream = require("./utils/handleLogs");
const openApiConfiguration = require("./docs/swagger");
const app = express();

const ENGINE_DB = process.env.ENGINE_DB;
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

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

/**
 * Define documentation route.
 */
app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(openApiConfiguration)
);

// Here goes the invokes to routes.
//todo  localhosat/api/*
app.use("/api", require("./routes"));

if (NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Your app is up and running on: http://localhost:${port}`);
  });
}

ENGINE_DB === "nosql" ? dbConnectNoSQL() : dbConnectSQL();

module.exports = app;
