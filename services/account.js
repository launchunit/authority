
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  joiHelpers = require('joi-helpers'),
  crypto = require('../lib/crypto'),
  promiseHelpers = require('promise-helpers'),
  objectId = joiHelpers.objectId();


/**
 * Constants
 */
const PERMISSION_LIMIT = 10;


module.exports = db => {

  // Reference To methods
  const Methods = db.collections.account.methods;


  /**
   * @params {String} input.email (Required)
   * @params {String} input.password (Required)
   * @params {String} input.password_confirm (Required)
   *
   * @params {Boolean} input.active (Optional Default=true)
   * @params {String} input.timezone (Optional)
   * @params {Boolean} input.email_verified (Optional)
   *
   * @public
   */
  function createAccount(input) {

    input = input || {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        Methods.create_account_password_confirm, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      return resolve(crypto.hash(input.password));;
    })
    .then(hashedPassword => {

      const Input = Object.assign({}, input, {
        password: hashedPassword
      });

      const validate = joiHelpers.validate(
        Methods.create_account, Input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return promiseHelpers.reject(validate);
      }

      logger.debug(Input);
      logger.debug(validate.value);

      // Save to DB
      return db.collections.account
               .insertOne(validate.value);
    })
    .then(result => {
      return { result: {
        id: result.insertedId
      }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  /**
   * @params {String} input.email (Required)
   * @params {String} input.password (Required)
   *
   * @public
   */
  function login(input) {

    input = input || {};
    var constants = {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        Methods.login, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      return resolve(db.collections.account.findOne({
        email: validate.value.email
      }, {
        limit: 1,
        fields: { 'password': 1, active: 1 }
      }));
    })
    .then(result => {

      // ToDo:
      // Deal with an Inactive Account
      // logger.debug(result);

      constants.id = result._id;
      return crypto.compare(input.password, result.password);
    })
    .then(passwordMatch => {

      if (passwordMatch === true) {

        // Update Login Things
        const validate = joiHelpers.validate(
          Methods.update_login, {});

        // Validate
        if (validate.error) {
          delete validate.value;
          return promiseHelpers.reject(validate);
        }

        logger.debug(validate.value);

        return db.collections.account.updateOne({
          _id: constants.id
        }, {
          $set: validate.value
        });
      }

      return promiseHelpers.reject({ error: [{
        path: 'password',
        message: 'Invalid email/password.'
      }]});

    })
    .then(result => {

      // Get Basic User Info Now
      return getAccount(constants);
    })
    .catch(promiseHelpers.mongoDone);
  };


  /**
   * @params {String} input.id (Required)
   * @params {String} input.email (Optional)
   * @params {Boolean} input.active (Optional)
   * @params {Boolean} input.email_verified (Optional)
   * @params {String} input.first_name (Optional)
   * @params {String} input.last_name (Optional)
   * @params {String} input.picture (Optional)
   * @params {String} input.bio (Optional)
   * @params {String} input.gender (Optional)
   * @params {String} input.timezone (Optional)
   *
   * @public
   */
  function updateAccount(input) {

    input = input || {};
    // const constants = {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        Methods.update_account, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      // logger.debug(validate.value);
      input.id = db.utils.toObjectID(input.id);

      return resolve(db.collections.account.updateOne({
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
            message: 'Account id not found, nothing was updated.'
          }]
        };
      }

      return { result: { id: input.id }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  /**
   * @params {String} input.id (Required)
   *
   * @public
   */
  function getAccount(input) {

    input = input || {};
    const constants = {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        Methods.get_account, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      // logger.debug(validate.value);
      input.id = db.utils.toObjectID(validate.value.id);

      return resolve(Promise.all([

        db.collections.account.findOne({
          _id: input.id
        }, {
          limit: 1,
          fields: { password: 0,
                    reset_token: 0,
                    reset_expiry: 0,
                    last_login: 0,
                    updated: 0 }
        }),

        db.collections.permission.find({
          account_id: input.id
        }, {
          limit: PERMISSION_LIMIT,
          fields: { created: 0, updated: 0, groups: 0 }
        }).toArray()
      ]));

    })
    .then(results => {

      if (results[0] && results[0].active === true &&
          results[1] && Array.isArray(results[1]) &&
          results[1].length) {

        // Save Reference
        constants.account = results[0];
        constants.permission = results[1];

        const promiseEach = () => {
         return _.map(results[1], permission => {
            return db.collections.org.findOne({
              _id: permission.org_id
            }, {
              limit: 1,
              fields: { created: 0,
                        updated: 0,
                        account_id: 0 }
            });
          });
        };

        return Promise.all(promiseEach());
      }

      return promiseHelpers.reject({
        error: [{
          path: 'id',
          message: 'Either user account or org is not active.'
        }]
      });

    })
    .then(Orgs => {

      // Remove Nulls & Inactive
      Orgs = _.chain(Orgs)
                 .compact()
                 .filter({ active: true })
                 .intersectionWith(constants.permission, (a, b) => {
                   return a._id.equals(b.org_id);
                 })
                 .value();

      if (Orgs.length) {

        _.forEach(Orgs, o => {

          Object.assign(o, _.find(constants.permission, {
            org_id: o._id
          })/*, { id: constants[1]._id }*/);

          // Cleanup
          delete o.account_id;
          delete o._id;
        });

        // Cleanup
        constants.account.permission = (Orgs && Orgs || null);
        constants.account.id = constants.account._id;
        delete constants.account._id;

        return { result: constants.account };
      }

      return {
        error: [{
          path: 'id',
          message: 'Either user account or org is not active.'
          // message: 'User account permission is not active.'
        }]
      };

    })
    .catch(promiseHelpers.mongoDone);
  };


  // Return
  return {
    createAccount,
    login,
    updateAccount,
    getAccount
  };
};
