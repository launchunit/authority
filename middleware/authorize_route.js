
'use strict';

/*
 * Module dependencies.
 * @private
 */
const _ = require('lodash');

/**
 * Constants
 */
const SESSION_HEADER = 'X-Session-Token',
  Roles = require('../lib/roles').rolesMap;


module.exports = Services => {

  /**
   * @params {Array} roles
   *
   * @public
   */
  return roles => {

    if (! Array.isArray(roles)) {
      throw new Error('Authorize route roles must be an array.')
    }

    // Validate Roles
    _.forEach(roles, role => {
      if (rolesMap[role] === undefined)
        throw new Error(`Authorize route role "${role}" is invalid.`);
    });

    // Convert to Object
    roles = _.zipObject(roles);


    /**
     * Authorize Route Middleware
     */
    return function authorizeRoute(req, res, next) {

      const token = req.get(SESSION_HEADER);
      req._session = req._session || {};
      req._session.authorize_in_progress = true;


      // Validate Session Token
      if (token) {

        authServer.validateToken(token)
        .then(result => {

        })
        .catch(err => {

        });

        // && bufferEq(MASTER_TOKEN, token)) {
        // req._session = req._session || {};
        // req._session.masterToken = true;
        // return next();
      }

      // Authorize Failed
      else {

        req._session.authorize_in_progress = false;
        req._session.authorize = false;
        return app.writeJson(res, 'not_authorized');
      }

    };

  };
};






