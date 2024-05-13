const jwt = require("jsonwebtoken");
const getProperties = require("./handlePropertiesEngine");
const JWT_SECRET = process.env.JWT_SECRET;


const propoertiesKey = getProperties();

/**
 * User object.
 * @param {*} user
 */
const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      [propoertiesKey.id]: user[propoertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return sign;
};

/**
 * Pass jwt swssion token.
 * @param {*} tokenJwt
 * @returns
 */
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
