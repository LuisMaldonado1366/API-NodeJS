const { tokenSign, verifyToken } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { matchedData } = require("express-validator");
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

    response.send({ data });
  } catch (err) {
    handleHttpError(res, `ERROR_REGISTER_USER: ${err}`);
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
        handleHttpError(res, `USER_NOT_EXIST: ${err}`, 404);
        return
    }

    const hashPassword = user.password;
    const checkPassword = await compare(request.password, hashPassword);

    if (!checkPassword) {
        handleHttpError(res, `PASSWORD_INVALID: ${err}`, 401);
    }
    
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    response.send({ data });
  } catch (err) {
    handleHttpError(res, `ERROR_LOGIN_USER: ${err}`);
  }
};

module.exports = { registerCtrl, loginCtrl };
