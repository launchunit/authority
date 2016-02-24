
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  deepFreeze = require('deep-freeze');

/**
 * Roles
 * @private
 */
const ROLES = deepFreeze({

  system: {
    owner: true,
    admin: true,
    member: true,
    guest: true,
  },

  org: {
    owner: true,
    admin: true,
    billing: true,
    manager: true,
    member: true,
    guest: true,
  },

  member: true,
  guest: true,

});


// Build Out the Array
const ROLES_MAP = _.chain(ROLES)
 .map(function(parent, parentKey) {

    // If Nested
    if (typeof parent === 'object') {

      return _.map(parent, (i, role) => {
        return i
            ? (parentKey + '.' + role).toLowerCase()
            : null;
      });
    }

    // Not Nested
    return parent
      ? parentKey.toLowerCase()
      : null;
  })
  .flattenDeep()
  .compact()
  .uniq()
  .value();


exports.roles = deepFreeze(ROLES_MAP);

exports.rolesMap = _.zipObject(ROLES_MAP,
                     _.fill(Array(ROLES_MAP.length), true));
