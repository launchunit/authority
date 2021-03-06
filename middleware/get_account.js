
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  promiseHelpers = require('promise-helpers');


module.exports = Services => {

  /**
   * @params {String} req._session.user.id (Required)
   *
   * @public
   */
  function getAccount(req, res, next) {

    req._session = req._session || {};
    var userObj;

    Services.getAccount(req._session.user)
    .then(user => {

      if (user.result) {

        // Clean up Permission
        user.result.permission = _.map(user.result.permission, p => {
          return _.pick(p, ['name', 'org_id', 'roles']);
        });

        return res.writeJson(user.result);
      }

      return promiseHelpers.reject(user.error);
    })

    .catch(err => {

      if (err instanceof Error)
        return next(err);

      return res.writeError(err);
    });
  };

  return { getAccount };
};
