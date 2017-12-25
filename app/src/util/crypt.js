'use strict';

let bcrypt = require('bcryptjs');

const generateHash = (plain) => {
  return bcrypt.hashSync(plain, bcrypt.genSaltSync(10));
}

const validateHash = (plain, hash) => {
  return bcrypt.compareSync(plain, hash);
}

module.exports = {
  generateHash,
  validateHash
};
