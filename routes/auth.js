const express = require("express");
const router = express.Router();
const { loginCtrl, registerCtrl } = require("../controllers/auth");
const { validatorLogin, validatorRegister } = require("../validators/auth");

/**
 * User register
 * @openapi
 * /auth/register:
 *       post:
 *           tags:
 *               - auth
 *           summary: "Register new user"
 *           description: "This route is used to register a new user."
 *           requestBody:
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: "#/components/schemas/authRegister"
 *           responses: 
 *               "201":
 *                   description: "User correctly registered."
 *               "403":
 *                   description: "Error by user data validation."
 */
router.post("/register", validatorRegister, registerCtrl);

/**
 * User login
 * @openapi
 * /auth/login:
 *       post:
 *           tags:
 *               - auth
 *           summary: "User login"
 *           description: "This route is used by the user to login."
 *           requestBody:
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: "#/components/schemas/authLogin"
 *           responses: 
 *               "201":
 *                   description: "User correctly logged in."
 *               "403":
 *                   description: "Error by user data validation."
 */
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;
