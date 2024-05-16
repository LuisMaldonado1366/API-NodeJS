const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const getProperties = require("../utils/handlePropertiesEngine");
const propoertiesKey = getProperties();

const getItems = async (req, res) => {
  try {
    const data = await tracksModel.findAllData({});
    const user = req.user;
    res.send({ data, user });
  } catch (err) {
    handleHttpError(res, `ERROR_GETTING_ITEMS: ${err}`);
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
    handleHttpError(res, `ERROR_CREATING_ITEM: ${err}`);
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
    const data = await tracksModel.findOneData(id);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, `ERROR_GETING_ITEM: ${err}`);
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

    const idQuery = {
      [propoertiesKey.id]: id,
    };

    const data = await tracksModel.updateOne(idQuery, body);
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
    const idQuery = {
      [propoertiesKey.id]: id,
    };

    const data = await tracksModel.delete(idQuery);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, `ERROR_DELETING_ITEM: ${err}`);
  }
};

module.exports = { getItems, readItem, createItem, updateItem, deleteItem };
