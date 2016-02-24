
'use strict';

/**
 * Module dependencies.
 * @private
 */
const joiHelpers = require('joi-helpers'),
  promiseHelpers = require('promise-helpers'),
  objectId = joiHelpers.objectId();


module.exports = db => {

  // Reference To methods
  const Methods = db.collections.org.methods;


  /**
   * @params {String} input.account_id (Required)
   * @params {String} input.name (Required)
   *
   * @params {String} input.description (Optional)
   * @params {Boolean} input.active (Optional Default=true)
   *
   * @private
   */
  function createOrg(input) {

    input = input || {};
    var constants = {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        Methods.create_org, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      logger.debug(validate.value);
      constants = validate.value;

      return resolve(db.collections.account.findOne({
        _id: db.utils.toObjectID(validate.value.account_id)
      }, {
        limit: 1,
        fields: { active: 1 }
      }));
    })
    .then(user => {

      if (user && user.active === true) {
        return db.collections.org.insertOne(constants);
      }

      return promiseHelpers.reject({
        error: [{
          path: 'account_id',
          message: 'User account is not active, org was not created.'
        }]
      });

    })
    .then(result => {
      return { result: { id:
        result.insertedId
      }};
    })
    .catch(promiseHelpers.mongoDone);
  };



  /**
   * @params {String} input.id (Required)
   * @params {String} input.name (Optional)
   * @params {String} input.description (Optional)
   * @params {Boolean} input.active (Optional)
   *
   * @public
   */
  function updateOrg(input) {

    input = input || {};
    // const constants = {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        Methods.update_org, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      // logger.debug(validate.value);
      input.id = db.utils.toObjectID(input.id);

      return resolve(db.collections.org.updateOne({
        _id: input.id
      }, {
        $set: validate.value
      }));

    })
    .then(result => {

      if (result.matchedCount === 0) {
        return {
          error: [{
            path: 'id',
            message: 'Org id not found, nothing was updated.'
          }]
        };
      }

      return { result: { id: input.id }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  // Return
  return { createOrg, updateOrg };

};
