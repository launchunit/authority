
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
   * @params {Object} req.body
   *
   * @public
   */
  function updateAccount(req, res, next) {

    req._session = req._session || {};
    var userObj;

    Services.updateAccount(Object.assign({},
      req._session.user, req.body))
    .then(user => {

      if (user.result) {
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

  return { updateAccount };
};
