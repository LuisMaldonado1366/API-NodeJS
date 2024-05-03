const { storageModel } = require("../models");
const PUBLIC_URL = process.env.PUBLIC_URL;

const getItems = async (req, res) => {
  const data = await storageModel.find({});

  res.send({ data });
};

/**
 * Create an item.
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  const {body, file} = req;
  console.log(file);
  const fileData = {
    filename: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`
  }
  const data = await storageModel.create(fileData);
  res.send({data});
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
