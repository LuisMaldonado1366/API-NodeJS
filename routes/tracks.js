const express = require("express");
const router = express.Router();
const customHeader = require("../middleware/customHeader");
const {validatorCreateItem, validatorReadItem, } = require("../validators/tracks");
const { getItems, createItem, readItem, updateItem, deleteItem } = require("../controllers/tracks");


//todo   http://localhost/tracks GET, POST, DELETE  PUT.
/** 
* Retrieves all items.
*/
router.get("/", getItems);

/**
* Create an item.
 */
router.post("/", validatorCreateItem, createItem);

/**
 * Read an item.
 */
router.get("/:id", validatorReadItem, readItem);

/**
 * Updates an item.
 */
router.put("/:id", validatorReadItem, validatorCreateItem, updateItem);

/**
 * Deletes an item.
 */
router.delete("/:id", validatorReadItem, deleteItem);

module.exports = router;
