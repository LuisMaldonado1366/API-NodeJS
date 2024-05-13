const fs = require("fs");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

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
    const data = await storageModel.findById({ _id: id });
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
    const dataFile = await storageModel.findById({ _id: id });
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;

    // // To delete from database and filesystem.
    // await storageModel.deleteOne({_id: id});
    // fs.unlinkSync(filePath);

    // To make soft-delete
    await storageModel.delete({ _id: id });

    const data = {
      filePath,
      deleted: 1,
    };

    res.send({ data });
  } catch (err) {
    handleHttpError(res, `ERROR_READING_ITEM: ${err}`);
  }
};

module.exports = { getItems, readItem, createItem, deleteItem };
