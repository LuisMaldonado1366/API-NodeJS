const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");
// const { find } = require("./tracks");

const StoreScheme = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    timestamps: true, //TODO createdAt , updatedAt
    versionKey: false,
  }
);

/**
 * Implementing custom method with relationship with 'storage' model.
 */
StoreScheme.statics.findAllData = function () {
  const joinData = this.find({});

  return joinData;
};

StoreScheme.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("storage", StoreScheme);
