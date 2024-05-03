const { tracksModel } = require("../models");

const getItems = async (req, res) => {
  const data = await tracksModel.find({});

  res.send({ data });
};

/**
 * Create an item.
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  const { body } = req;
  console.log(body);
  const data = await tracksModel.create(body);
  res.send(data);
};

/**
 * Read an item.
 * @param {*} req
 * @param {*} res
 */
const readItem = (req, res) => {};

/**
 * Update an item.
 * @param {*} req
 * @param {*} res
 */
const updateItem = (req, res) => {};

/**
 * Delete an item.
 * @param {*} req
 * @param {*} res
 */
const deleteItem = (req, res) => {};

module.exports = { getItems, readItem, createItem, updateItem, deleteItem };
