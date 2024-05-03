const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

async function dbConnectNoSQL() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DB_URI);
    
    console.log("***** SUCCESS CONNECTING TO DATABASE *****");
  } catch (error) {
    console.log(`***** ERROR CONNECTING TO DATABASE: ${error} *****`);
    process.exit();
  }
};

module.exports = dbConnectNoSQL;
