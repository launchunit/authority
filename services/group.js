
'use strict';

/**
 * Module dependencies.
 * @private
 */
const joiHelpers = require('joi-helpers'),
  promiseHelpers = require('promise-helpers'),
  objectId = joiHelpers.objectId();


module.exports = db => {

  /**
   * @params {String} input.account_id (Required)
   * @params {String} input.org_id (Required)
   * @params {String} input.name (Required)
   *
   * @params {String} input.description (Optional)
   * @params {Boolean} input.active (Optional Default=true)
   *
   * @private
   */
  function createGroup(input) {

    input = input || {};
    var constants = {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        db.collections.account.methods.create_group, Object.assign(input, {
          created_by: input.account_id
        }));

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      logger.debug(validate.value);

      // Cast _id & org_id
      input.account_id = db.utils.toObjectID(input.account_id);
      input.org_id = db.utils.toObjectID(input.org_id);
      constants = validate.value;


      return resolve(Promise.all([

        // Verify created_by
        db.collections.account.findOne({
          _id: input.account_id
        }, {
          limit: 1,
          fields: { active: 1 }
        }),

        db.collections.org.findOne({
          _id: input.org_id
        }, {
          limit: 1,
          fields: { active: 1 }
        })
      ]));

    })
    .then(results => {

      if (results[0] && results[0].active === true &&
          results[1] && results[1].active === true) {
        return db.collections.group.insertOne(constants);
      }

      return promiseHelpers.reject({
        error: [{
          path: 'account_id',
          message: 'Either user account or org is not active, group was not created.'
        }]
      });

    })
    .then(result => {
      return { result: { id: result.insertedId }};
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
  function updateGroup(input) {

    input = input || {};
    const constants = {};

    return new Promise((resolve, reject) => {

      // Validate id
      const validateId = joiHelpers.validate(objectId,
                           (input.id || ''));

      if (validateId.error) {
        delete validateId.value;
        return reject(validateId);
      }

      // Cast _id
      constants.id = db.utils.toObjectID(validateId.value);


      const validate = joiHelpers.validate(
        db.collections.org.methods.update_group, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      logger.debug(validate.value);

      return resolve(db.collections.group.updateOne({
        _id: constants.id
      }, {
        $set: validate.value
      }));

    })
    .then(result => {

      if (result.matchedCount === 0) {
        return {
          error: [{
            path: 'id',
            message: 'Group id not found, nothing was updated.'
          }]
        };
      }

      return { result: { id: constants.id }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  // Return
  return { createGroup, updateGroup };
};
