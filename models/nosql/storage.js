const mongoose = require("mongoose");

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

module.exports = mongoose.model("storage", StoreScheme);
