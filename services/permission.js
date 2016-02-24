
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  joiHelpers = require('joi-helpers'),
  promiseHelpers = require('promise-helpers'),
  objectId = joiHelpers.objectId();


module.exports = db => {

  // Reference To methods
  const Methods = db.collections.permission.methods;

  /**
   * @params {ObjectId} input.id (Required)
   * @params {Array} input.roles (Optional)
   * @params {Boolean} input.removeRoles (Optional)
   *
   * Expects Sanitized Values
   * @private
   */
  function updateRoles(input) {

    // Case Id for Extra Error Protection
    input.id = db.utils.toObjectID(input.id);

    return new Promise((resolve, reject) => {

      // For Deleting the Permission
      if (input.roles === null) {
        return resolve(db.collections.permission.deleteOne({
          _id: input.id,
        }));
      }

      // Find the Permission First
      return resolve(db.collections.permission.findOne({
        _id: input.id,
      }, {
        limit: 1,
        fields: { roles: 1 }
      }));
    })
    .then(result => {

      // This is From Remove Operation
      if (result.ok) {
        return promiseHelpers.resolve(result);
      }

      // Permission is Found
      else if (result) {

        var updaterObj = {
          '$set': {
            updated: new Date()
          }
        };

        // Roles Already Exists
        if (Array.isArray(result.roles)) {

          if (input.removeRoles === true) {
            updaterObj['$pullAll'] = {
              roles: input.roles
            };
          }

          else {
            updaterObj['$addToSet'] = {
              roles:  { $each: input.roles }
            };
          }
        }

        // Create New Roles Array
        else {

          if (input.removeRoles === true) {
            updaterObj['$set']['roles'] = [];
          }

          else {
            updaterObj['$set']['roles'] = input.roles;
          }
        }

        logger.debug(updaterObj);

        return db.collections.permission.updateOne({
          _id: input.id
        }, updaterObj);
      }

      return promiseHelpers.reject({
        error: [{
          path: 'id',
          message: 'Permission id not found, nothing was updated.'
        }]
      });

    });
  };


  /**
   * @params {String} input.account_id (Required)
   * @params {String} input.org_id (Required)
   * @params {Array} input.roles (Required)
   * @params {Array} input.groups (Optional)
   *
   * @public
   */
  function createPermission(input) {

    input = input || {};
    var constants = {};
    var permission_id;

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        Methods.create_permission, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      constants = validate.value;

      // Cast _id & org_id
      constants.account_id = db.utils.toObjectID(validate.value.account_id);
      constants.org_id = db.utils.toObjectID(validate.value.org_id);


      return resolve(Promise.all([

        // Verify created_by
        db.collections.account.findOne({
          _id: constants.account_id
        }, {
          limit: 1,
          fields: { active: 1 }
        }),

        // Verify org_id
        db.collections.org.findOne({
          _id: constants.org_id
        }, {
          limit: 1,
          fields: { active: 1 }
        }),

        // Check if account_id & org_id exists
        db.collections.permission.findOne({
          account_id: constants.account_id,
          org_id: constants.org_id
        }, {
          limit: 1,
          fields: { _id: 1 }
        })
      ]));

    })
    .then(results => {

      // logger.debug(results);
      logger.debug(constants);

      // Permission Doesnt Exist
      if (results[2] === null) {

        if (results[0] && results[0].active === true &&
            results[1] && results[1].active === true) {

          return db.collections.permission.insertOne(constants);
        }

        else {
          return promiseHelpers.reject({
            error: [{
              path: 'account_id',
              message: 'Either user account or org is not active, permission was not created.'
            }]
          });
        }
      }

      // Permission Exists, Update Roles & Group

      // Globally Storing permission_id
      permission_id = results[2]._id;

      return Promise.all([
        // Update Roles
        updateRoles({
          id: permission_id,
          roles: constants.roles
        })
      ]);

    })
    .then(result => {

      logger.debug(result);

      if (result.matchedCount === 0) {
        return {
          error: [{
            path: 'id',
            message: 'Permission id not found, nothing was updated.'
          }]
        };
      }

      return { result: {
        id: result.insertedId || permission_id
      }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  /**
   * @params {String} input.id (Required)
   * @params {Array|null} input.roles (Optional)
   * @params {Array} input.groups (Optional)
   * @params {Boolean} input.removeRoles (Optional)
   *
   * @public
   */
  function updatePermission(input) {

    input = input || {};
    var constants = {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        Methods.update_permission, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      constants = validate.value;

      // Cast id
      input.id = db.utils.toObjectID(input.id);


      // Check if account_id & org_id exists
      return resolve(db.collections.permission.findOne({
          _id: input.id
        }, {
          limit: 1,
          fields: { account_id: 1, org_id: 1 }
        }));

    })
    .then(result => {

      logger.debug(result);

      if (result && result.account_id && result.org_id) {

        return Promise.all([

          // Verify account_id
          db.collections.account.findOne({
            _id: result.account_id
          }, {
            limit: 1,
            fields: { active: 1 }
          }),

          // Verify org_id
          db.collections.org.findOne({
            _id: result.org_id
          }, {
            limit: 1,
            fields: { active: 1 }
          })
        ]);
      }

      return promiseHelpers.reject({
        error: [{
          path: 'id',
          message: 'Permission id not found, nothing was updated.'
        }]
      });

    })
    .then(results => {

      if (results[0] && results[0].active === true &&
          results[1] && results[1].active === true) {

        return Promise.all([
          // Update Roles
          updateRoles(Object.assign({}, input, constants))

          // ToDo: Update Groups
        ]);
      }

      return promiseHelpers.reject({
        error: [{
          path: 'account_id',
          message: 'Either user account or org is not active, permission was not created.'
        }]
      });

    })
    .then(result => {

      if (result.matchedCount === 0) {
        return {
          error: [{
            path: 'id',
            message: 'Permission id not found, nothing was updated.'
          }]
        };
      }

      return { result: { id: input.id }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  // Return
  return { createPermission, updatePermission };
};
