
'use strict';

/**
 * Module dependencies.
 * @private
 */
const joiHelpers = require('joi-helpers'),
  promiseHelpers = require('promise-helpers'),
  objectId = joiHelpers.objectId(),
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

const SCHEMA = joiHelpers.compile({
  id: joiHelpers.objectId().required(),
  org_id: joiHelpers.objectId().required(),
});


module.exports = HMAC_SALT => {

  // Type Case It
  HMAC_SALT = HMAC_SALT.toString();


  /**
   * @params {String} input.id (Required)
   * @params {String} input.org_id (Required)
   *
   * @public
   */
  function createToken(input) {

    input = input || {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(SCHEMA, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      // Prep Data
      const Data = {
        i: input.id.toString(),
        o: input.org_id.toString()
      };

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

          if (unsealed && unsealed.i && unsealed.o) {
            return resolve({
              result: {
                id: unsealed.i, org_id: unsealed.o
              }
            });
          }

          return resolve({ result: false });
      });
    });
  };


  // Return
  return {
    createToken,
    validateToken
  };

};
