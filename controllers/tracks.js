const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const getItems = async (req, res) => {
  try {
    const data = await tracksModel.find({});
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_GETTING_ITEMS");
  }
};

/**
 * Create an item.
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_CREATING_ITEM");
  }
};

/**
 * Read an item.
 * @param {*} req
 * @param {*} res
 */
const readItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await tracksModel.findById(id);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_GETING_ITEM");
  }
};

/**
 * Update an item.
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findOneAndUpdate({ _id: id }, body, {
      returnOriginal: false,
    });
    res.send({ data });
  } catch (err) {
    handleHttpError(res, `ERROR_UPDATING_ITEM: ${err}`);
  }
};

/**
 * Delete an item.
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await tracksModel.delete({ _id: id });
    res.send({ data });
  } catch (err) {
    handleHttpError(res, `ERROR_DELETING_ITEM: ${err}`);
  }
};

module.exports = { getItems, readItem, createItem, updateItem, deleteItem };
