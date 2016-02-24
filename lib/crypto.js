
'use strict';

/**
 * Module dependencies.
 * @private
 */
const Bcrypt = require('bcrypt');


/**
 * Constants
 */
const SALT_ROUNDS = 8;


/**
 * @params {String} password
 *
 * @private
 */
exports.hash = password => {

  return new Promise((resolve, reject) => {

    Bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
      if (err) return reject(err);
      return resolve(hashedPassword);
    });

  });
};


/**
 * @params {String} password
 * @params {String} hashedPassword
 *
 * @private
 */
exports.compare = (password, hashedPassword) => {

  return new Promise((resolve, reject) => {

    Bcrypt.compare(password, hashedPassword, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};
