
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  promiseHelpers = require('promise-helpers');


module.exports = (Services, Opts) => {

  /**
   * @params {String} input.email (Required)
   * @params {String} input.password (Required)
   *
   * @public
   */
  function login(req, res, next) {

    var userObj;

    Services.login(req.body)
    .then(user => {

      if (user.result &&
          user.result.id &&
          user.result.permission &&
          user.result.permission.length) {

        userObj = _.pick(user.result, [
          'id',
          'first_name',
          'last_name',
          'timezone'
        ]);

        // If Simple Auth, then put roles in the token
        if (Opts.simpleAuth) {

          return Services.createToken({
            id: userObj.id,
            roles: user.result.permission[0].roles
          });
        }

        // Clean up Permission
        userObj.permission = _.map(user.result.permission, p => {
          return _.pick(p, ['name', 'org_id', 'roles']);
        });

        return Services.createToken({ id: userObj.id });
      }

      return promiseHelpers.reject(user.error);
    })

    .then(token => {
      userObj.token = token.result;
      return res.writeJson(userObj);
    })

    .catch(err => {

      if (err instanceof Error)
        return next(err);

      return res.writeError(err);
    });
  };

  return { login };
};
