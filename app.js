require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnectNoSQL = require("./config/mongo");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port = process.env.PORT || 3000;

// Here goes the invokes to routes.
//todo  localhosat/api/* 
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Your app is up and running on: http://localhost:${port}`);
});

dbConnectNoSQL();