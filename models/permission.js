
'use strict';

/**
 * Module dependencies.
 * @private
 */
const Joi = require('joi'),
  joiHelpers = require('joi-helpers'),
  Roles = require('../lib/roles').roles;


/**
 * Permission Model
 */
exports.name = 'permission';

exports.schema = {

  // Basics
  account_id: joiHelpers.objectId(),

  org_id: joiHelpers.objectId(),

  roles: Joi.array().unique().sparse(false).min(1)
            .items(Joi.string().valid(Roles)),

  groups: Joi.array().unique().sparse(false)
             .items(joiHelpers.objectId()),

  // Book-keeping
  created: Joi.date().min('now').default(new Date),
  updated: Joi.date().min('now').default(new Date)
};

exports.methods = {

  // Create New Permission
  create_permission: Joi.object({
    account_id: exports.schema.account_id,
    org_id: exports.schema.org_id,
    roles: exports.schema.roles,
    groups: exports.schema.groups,
    created: exports.schema.created,
    updated: exports.schema.updated,
  })
  .requiredKeys('account_id', 'org_id', 'roles')
  .options({
    language: {
      array: {
        base: '{{key}} must be an array.',
      }
    }}),

  // Update Permission
  update_permission: Joi.object({

    // For Services Only
    id: exports.schema.account_id.required().strip(),
    removeRoles: Joi.boolean(),

    updated: exports.schema.updated,
    groups: exports.schema.groups
            .options({
              language: { array: {
                base: '{{key}} must be an array.',
              }}}),

    // For Update, Either Null or Array Is Allowed
    // If Null, Permission is Removed
    roles: Joi.alternatives().try(
                 Joi.valid(null),
                 exports.schema.roles)
              .options({ language: {
                array: {
                  min: '{{key}} must be an array or [null].',
                  base: '{{key}} must be an array or [null].'
                },
                any: { allowOnly: '{{key}} must be an array or [null].' }
              }})
  })
  .min(2)
  .with('removeRoles', 'roles')
  .options({
    language: {
      object: {
        with: '!!{{peer}} is required.',
        min: '!!Permission object must have at least 1 field to update.',
      }
    }
  }),

};

exports.indexes = [
  [ { account_id: 1 }, { unique: false, sparse: false } ],
  [ { org_id: 1 }, { unique: false, sparse: false } ],
  [ { account_id: 1, org_id: 1 }, { unique: true, sparse: false } ],
];
