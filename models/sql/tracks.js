const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const Storage = require("./storage");

const Tracks = sequelize.define(
  "tracks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    artist_name: {
      type: DataTypes.STRING,
    },
    artist_nickname: {
      type: DataTypes.STRING,
    },
    artist_nationality: {
      type: DataTypes.STRING,
    },
    duration_start: {
      type: DataTypes.INTEGER,
    },
    duration_end: {
      type: DataTypes.INTEGER,
    },
    mediaId: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    deletedAt: "deleted",
    paranoid: true,
  }
);

/**
 * Implementing custom model
 */
Tracks.belongsTo(Storage, {
  foreignKey: "mediaId",
  as: "audio",
});

Tracks.findAllData = function () {
  const allData = Tracks.findAll({
    include: "audio",
  });

  return allData;
};

Tracks.findOneData = function (id) {
  const oneData = Tracks.findOne({
    where: { id },
    include: "audio",
  });

  return oneData;
};

Tracks.delete = function (id) {
  const oneData = Tracks.destroy({
    where: id,
  });

  return oneData;
};

Tracks.updateOne = async function (id, body) {
  const oneData = await Tracks.findOne({ where: id });

  const updateData = oneData.update(body);

  return updateData;
};

module.exports = Tracks;
