const mongoose = require("mongoose");

const NODE_ENV = process.env.NODE_ENV;



async function dbConnectNoSQL() {
    const DB_URI = (NODE_ENV === "test") ? process.env.DB_URI_TEST : process.env.DB_URI;
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(DB_URI);
    
        console.log("***** SUCCESS CONNECTING TO NOSQL DATABASE *****");
    } catch (error) {
        console.log(`***** ERROR CONNECTING TO NOSQL DATABASE: ${error} *****`);
        process.exit();
    }
};

module.exports = dbConnectNoSQL;
