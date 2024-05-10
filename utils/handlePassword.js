const bcryotjs = require("bcryptjs");

/**
 * Uncrypted password.
 * @param {*} passwordPlain
 */
const encrypt = async (passwordPlain) => {
  const hash = await bcryotjs.hash(passwordPlain, 10);

  return hash;
};

/**
 * User input password and hash saved password to compare.
 * @param {*} passwordPlain
 * @param {*} passwordHash
 */
const compare = async (passwordPlain, passwordHash) => {
  const resultCompare = await bcryotjs.compare(passwordPlain, passwordHash);

  return resultCompare;
};

module.exports = { encrypt, compare };
