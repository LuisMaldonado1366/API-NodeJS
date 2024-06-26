const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { usersModel } = require("../models");

/**
 * Register user controller.
 * @param {*} request
 * @param {*} response
 */
const registerCtrl = async (request, response) => {
  try {
    request = matchedData(request);

    const password = await encrypt(request.password);

    const body = { ...request, password };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    response.status(201);
    response.send({ data });
  } catch (err) {
    handleHttpError(response, `ERROR_REGISTER_USER: ${err}`);
  }
};

/**
 * User login controller.
 * @param {*} request
 * @param {*} response
 */
const loginCtrl = async (request, response) => {
  try {
    request = matchedData(request);

    const user = await usersModel.findOne({ email: request.email });

    if (!user) {
      handleHttpError(response, `USER_NOT_EXIST`, 404);
      return;
    }

    const hashPassword = user.get("password");
    const checkPassword = await compare(request.password, hashPassword);

    if (!checkPassword) {
      handleHttpError(response, `INVALID_PASSWORD`, 401);
      return;
    }

    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };

    response.status(201);
    response.send({ data });
  } catch (err) {
    handleHttpError(response, `ERROR_LOGIN_USER: ${err}`);
  }
};

module.exports = { registerCtrl, loginCtrl };
