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
const checkRole = require("../middleware/role");
//todo   http://localhost:{PORT}/storage GET, POST, DELETE  PUT.

/**
 * Get all items.
 */
router.get("/", authMiddleware, checkRole(["admin", "user"]), getItems);

/**
 * Create an item.
 */
router.post(
  "/",
  authMiddleware,
  checkRole(["admin", "user"]),
  uploadMiddleware.single("uploadFile"),
  createItem
);

/**
 * Read an item.
 */
router.get(
  "/:id",
  authMiddleware,
  checkRole(["admin", "user"]),
  validatorReadItem,
  readItem
);

/**
 * Delete an item.
 */
router.delete(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  validatorReadItem,
  deleteItem
);

module.exports = router;
