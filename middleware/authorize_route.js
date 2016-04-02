
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
  rolesMap = require('../lib/roles').rolesMap;


module.exports = (Services, Opts) => {

  /**
   * @params {Array} roles
   *
   * @public
   */
  function authorizeRoute(Roles) {

    if (! (Array.isArray(Roles) && Roles.length)) {
      throw new Error('Authorize route roles must be an array.')
    }

    // Validate Roles
    _.forEach(Roles, role => {
      if (rolesMap[role] === undefined)
        throw new Error(`Authorize route role "${role}" is invalid.`);
    });


    /**
     * Authorize Route Middleware
     */
    return (req, res, next) => {

      const token = req.get(SESSION_HEADER);
      req._session = req._session || {};

      // Validate Session Token
      if (token) {

        Services.validateToken(token)
        .then(result => {

          // If id is Present
          if (result.result.id) {

            // logger.debug(result.result);

            // Begin Process
            req._session.user = {};
            req._session.user.id = result.result.id;

            // Validate Role
            if (result.result.roles) {
              req._session.user.roles = _.intersection(
                result.result.roles, Roles);

              if (req._session.user.roles.length < 1) {
                return res.writeError('not_authorized');
              }
            }

            // Validate Only Token - simpleAuth
            else if (Opts.simpleAuth) {
              return res.writeError('not_authorized');
            }

            // ToDo:
            // Deffered Event or Promise Based Auth System
            // else {}

            return next();
          }

          return res.writeError('not_authorized');
        })

        .catch(err => {

          if (err instanceof Error)
            return next(err);

          return res.writeError('not_authorized');
        });
      }

      // Authorize Failed
      else return res.writeError('not_authorized');
    };

  };

  return { authorizeRoute };
};
