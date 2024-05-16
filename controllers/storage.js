const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const getProperties = require("../utils/handlePropertiesEngine");
const propoertiesKey = getProperties();

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
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
    const { body, file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
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
    const data = await storageModel.findById(id);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, `ERROR_READING_ITEM: ${err}`);
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
    const dataFile = await storageModel.findById(id);
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;

    // To make soft-delete
    // await storageModel.delete(id);

    const idQuery = {
      [propoertiesKey.id]: id,
    };

    const deleteResult = await storageModel.delete(idQuery);

    const data = {
      filePath,
      deleted: deleteResult,
    };

    res.send({ data });
  } catch (err) {
    handleHttpError(res, `ERROR_READING_ITEM: ${err}`);
  }
};

module.exports = { getItems, readItem, createItem, deleteItem };
