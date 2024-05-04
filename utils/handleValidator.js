
const { validationResult } = require("express-validator");

const validateResults = (request, response, next) => {
  try {
    validationResult(request).throw();
    return next();
  } catch (err) {
    response.status((code = 403));
    response.send((body = { errors: err.array() }));
  }
};

module.exports = validateResults;