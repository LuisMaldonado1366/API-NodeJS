const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const authMiddleware = require("../middleware/session");
const { validatorReadItem } = require("../validators/storage");
const {
  getItems,
  createItem,
  readItem,
  deleteItem,
} = require("../controllers/storage");
//todo   http://localhost:{PORT}/storage GET, POST, DELETE  PUT.

/**
 * Get all items.
 */
router.get("/", authMiddleware, getItems);

/**
 * Create an item.
 */
router.post("/", authMiddleware, uploadMiddleware.single("uploadFile"), createItem);

/**
 * Read an item.
 */
router.get("/:id", authMiddleware, validatorReadItem, readItem);

/**
 * Delete an item.
 */
router.delete("/:id", authMiddleware, validatorReadItem, deleteItem);

module.exports = router;
