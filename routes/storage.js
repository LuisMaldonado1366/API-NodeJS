const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { validatorReadItem } = require("../validators/storage");
const {
  getItems,
  createItem,
  readItem,
  updateItem,
  deleteItem,
} = require("../controllers/storage");
//todo   http://localhost:{PORT}/storage GET, POST, DELETE  PUT.

/**
 * Get all items.
 */
router.get("/", getItems);

/**
 * Create an item.
 */
router.post("/", uploadMiddleware.single("uploadFile"), createItem);

/**
 * Read an item.
 */
router.get("/:id", validatorReadItem, readItem);

/**
 * Update an item.
 */
router.put("/:id", validatorReadItem, updateItem);

/**
 * Delete an item.
 */
router.delete(":/id", validatorReadItem, deleteItem);

module.exports = router;
