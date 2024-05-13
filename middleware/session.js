const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");

const authMiddleware = async (request, response, next) => {
  try {
    const requestToken = request.headers.authorization;

    if (!requestToken) {
      handleHttpError(response, "WRONG_TOKEN", 401);
      return;
    }

    const sessionToken = requestToken.split(" ").pop();
    const dataToken = await verifyToken(sessionToken);


    if (!dataToken._id) {
        handleHttpError(response, "ID_TOKEN_ERROR", 401);
        return;
    }

    const user = await usersModel.findById(dataToken._id);
    request.user = user;

    next();

  } catch (err) {
    handleHttpError(response, "NO_SESSION", 401);
  }
};

module.exports = authMiddleware;
