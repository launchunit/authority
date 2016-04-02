
'use strict';

/**
 * Module dependencies.
 * @private
 */
const Joi = require('joi'),
  joiHelpers = require('joi-helpers'),
  promiseHelpers = require('promise-helpers'),
  objectId = joiHelpers.objectId(),
  Roles = require('../lib/roles').roles,
  deepFreeze = require('deep-freeze'),
  Iron = require('iron');

/**
 * Constants
 * @private
 */
const HMAC_OPTS = deepFreeze({
  encryption: {
    saltBits: 256,
    algorithm: 'aes-256-cbc',
    iterations: 1,
    minPasswordlength: 32
  },
  integrity: {
    saltBits: 256,
    algorithm: 'sha256',
    iterations: 1,
    minPasswordlength: 32
  },
  ttl: 0,
  timestampSkewSec: 60,
  localtimeOffsetMsec: 0
});


module.exports = (HMAC_SALT, db) => {

  // Type Cast It
  HMAC_SALT = HMAC_SALT.toString();


  /**
   * @params {String} input.id (Required)
   * @params {Array} input.roles (Optional)
   *
   * @public
   */
  function createToken(input) {

    input = input || {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        db.collections.permission.methods.create_token, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      // Prep Data
      const Data = { i: validate.value.id.toString() };

      // Add Role to Data
      if (validate.value.roles) {
        Data.r = validate.value.roles;
      }

      Iron.seal(Data, HMAC_SALT, HMAC_OPTS, (err, sealed) => {
        if (err) return reject(err);
        return resolve(sealed);
      });

    })
    .then(result => {
      return { result: result };
    })
    .catch(promiseHelpers.done);
  };


  /**
   * @params {String} token (Required)
   *
   * @public
   */
  function validateToken(token) {

    const Token = typeof token !== 'string'
      ? '' : token;

    return new Promise((resolve, reject) => {

      Iron.unseal(Token, HMAC_SALT, HMAC_OPTS,
        (err, unsealed) => {

          // if (err) logger.error(err);;

          if (unsealed && unsealed.i) {
            const result = { id: unsealed.i };

            if (unsealed.r) result.roles = unsealed.r;
            return resolve({ result: result })
          }

          return resolve({ result: false });
      });
    });
  };


  // Return
  return { createToken, validateToken };
};
