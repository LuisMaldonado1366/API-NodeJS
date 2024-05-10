const express = require("express");
const router = express.Router();
const { loginCtrl, registerCtrl } = require("../controllers/auth");
const { validatorLogin, validatorRegister } = require("../validators/auth");

// const { tokenSign, verifyToken } = require("../utils/handleJwt");
// const { encrypt, compare } = require("../utils/handlePassword");
// const { matchedData } = require("express-validator");
// const { usersModel } = require("../models");
/**
 * User login
 */
router.post("/login", validatorLogin, loginCtrl);

/**
 * User register
 */
router.post("/register", validatorRegister, registerCtrl);

module.exports = router;
