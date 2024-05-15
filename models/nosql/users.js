const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: true,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, //TODO createdAt , updatedAt
    versionKey: false,
  }
);

UserScheme.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UserScheme);
