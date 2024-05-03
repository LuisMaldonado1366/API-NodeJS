const express = require("express");
const { getItems, readItem, createItem } = require("../controllers/tracks");
const router = express.Router();

//todo   http://localhost/tracks GET, POST, DELETE  PUT.

router.get("/", getItems);
router.post("/", createItem);

module.exports = router;
