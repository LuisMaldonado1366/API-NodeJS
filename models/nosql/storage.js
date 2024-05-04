const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");

const StoreScheme = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    fileName: {
      type: String,
    },
  },
  {
    timestamps: true, //TODO createdAt , updatedAt
    versionKey: false,
  }
);

StoreScheme.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("storage", StoreScheme);
