const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const getProperties = require("../utils/handlePropertiesEngine");

const propoertiesKey = getProperties();

const authMiddleware = async (request, response, next) => {
  try {
    const requestToken = request.headers.authorization;

    if (!requestToken) {
      handleHttpError(response, "WRONG_TOKEN", 401);
      return;
    }

    const sessionToken = requestToken.split(" ").pop();
    const dataToken = await verifyToken(sessionToken);

    if (!dataToken) {
      handleHttpError(response, "NO_PAYLOAD_DATA", 401);
      return;
    }

    const query = {
      [propoertiesKey.id]: dataToken[propoertiesKey.id],
    };

    const user = await usersModel.findOne(query);
    request.user = user;

    next();
  } catch (err) {
    handleHttpError(response, "NO_SESSION", 401);
  }
};

module.exports = authMiddleware;
