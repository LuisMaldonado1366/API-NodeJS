const { handleHttpError } = require("../utils/handleError");

/**
 * Array with the allowed roles.
 * @param {*} allowedRoles
 * @returns
 */
const checkRole = (allowedRoles) => async (request, response, next) => {
  try {
    const { user } = request;
    const rolesByUser = user.role;

    const checkValueRole = allowedRoles.some((roleSingle) =>
      rolesByUser.includes(roleSingle)
    );

    if (!checkValueRole) {
      handleHttpError(response, "USER_NOT_PERMISSIONS", 403);
      return;
    }
    next();
  } catch (err) {
    handleHttpError(response, `ERROR_PERMISSIONS: ${err}`, 403);
  }
};

module.exports = checkRole;
