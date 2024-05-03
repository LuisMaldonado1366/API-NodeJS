const express = require("express");
const router = express.Router();

//todo   http://localhost/tracks GET, POST, DELETE  PUT.

router.get("/", (req, res) => {
  const data = ["hello", "world"];

  res.send({ data });
});

module.exports = router;
