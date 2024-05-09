const fs = require("fs");
const { response } = require("express");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `$(__dirname__)/../storage`;

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
  const { body, file } = req;
  const fileData = {
    filename: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`,
  };
  const data = await storageModel.create(fileData);
  res.send({ data });
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
    console.log(data);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, `ERROR_READING_ITEM: ${err}`);
  }
};

/**
 * Update an item.
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {};

/**
 * Delete an item.
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById({ _id: id });
    const {filename} = dataFile;
    console.log(dataFile);
    const filePath = `${MEDIA_PATH}/${filename}`;
    console.log(filePath);
    // fs.unlinkSync(filePath);

    const data = {
      filePath,
      deleted: 1
    }
    res.send({ data });
  } catch (err) {
    handleHttpError(res, `ERROR_READING_ITEM: ${err}`);
  }
};

module.exports = { getItems, readItem, createItem, updateItem, deleteItem };
