const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const Storage = sequelize.define(
  "storages",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    deletedAt: 'deleted',
    paranoid: true
  }
);

Storage.find = Storage.findAll;
Storage.findById = Storage.findByPk;

/**
 * Implementing custom method with relationship with 'storage' model.
 */
Storage.delete = function (id) {
  const oneData = Storage.destroy({
    where:  id 
  });

  return oneData;
};

module.exports = Storage ;
