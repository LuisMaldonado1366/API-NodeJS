const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { createItem } = require("../controllers/storage");
//todo   http://localhost:{PORT}/storage GET, POST, DELETE  PUT.



router.post("/", uploadMiddleware.single("uploadFile"), createItem);

module.exports = router;
