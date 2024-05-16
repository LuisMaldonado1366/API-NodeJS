const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const {
  validatorCreateItem,
  validatorReadItem,
} = require("../validators/tracks");
const {
  getItems,
  createItem,
  readItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks");
const checkRole = require("../middleware/role");

//todo   http://localhost/tracks GET, POST, DELETE  PUT.
/**
 * Retrieves all items.
 */
router.get("/", authMiddleware, checkRole(["admin", "user"]), getItems);

/**
 * Create an item.
 */
router.post(
  "/",
  authMiddleware,
  checkRole(["admin", "user"]),
  validatorCreateItem,
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
 * Updates an item.
 */
router.put(
  "/:id",
  authMiddleware,
  checkRole(["admin", "user"]),
  validatorReadItem,
  validatorCreateItem,
  updateItem
);

/**
 * Deletes an item.
 */
router.delete(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  validatorReadItem,
  deleteItem
);

module.exports = router;
