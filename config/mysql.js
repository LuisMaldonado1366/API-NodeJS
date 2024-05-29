const { Sequelize } = require("sequelize");

const NODE_ENV = process.env.NODE_ENV;
const DB_URI = (NODE_ENV === "test") ? process.env.DB_URI_TEST : process.env.DB_URI;

const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = (NODE_ENV === "test") ? process.env.MYSQL_DATABASE_TEST : process.env.MYSQL_DATABASE;

const sequelize = new Sequelize(database, username, password, {
  dialect: "mysql",
  host: host,
  port: port,
});

const dbConnectSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("***** SUCCESS CONNECTING TO SQL DATABASE *****");
  } catch (error) {
    console.log(`***** ERROR CONNECTING TO SQL DATABASE: ${error} *****`);
    process.exit();
  }
};

module.exports = { sequelize, dbConnectSQL };
