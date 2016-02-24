
'use strict';

/**
 * Module dependencies.
 * @private
 */
const Joi = require('joi'),
  joiHelpers = require('joi-helpers');


/**
 * Group Model
 */
exports.name = 'group';

exports.schema = {

  // Basics
  name: Joi.string().trim().label('Group Name'),
  description: Joi.string().trim(),

  // Meta
  active: Joi.boolean(),

  // Keys
  org_id: joiHelpers.objectId(),
  created_by: joiHelpers.objectId(),

  // Book-keeping
  created: Joi.date().min('now').default(new Date),
  updated: Joi.date().min('now').default(new Date)
};

exports.methods = {

  // Create New Group
  create_group: Joi.object({

    // For Services Only
    account_id: exports.schema.created_by.required().strip(),

    name: exports.schema.name,
    description: exports.schema.description,
    org_id:  exports.schema.org_id,
    created_by: exports.schema.created_by,
    active: exports.schema.active.default(true),
    created: exports.schema.created,
    updated: exports.schema.updated
  })
  .with('account_id', 'created_by')
  .requiredKeys('name', 'org_id')
  .options({
    language: {
      object: {
        with: '!!{{peer}} is required.'
      }
    }
  }),


  // Update Group
  update_group: Joi.object({

    // For Services Only
    id: exports.schema.created_by.required().strip(),

    name: exports.schema.name,
    description: exports.schema.description,
    active: exports.schema.active,
    updated: exports.schema.updated,
  })
  .min(2)
  .options({
    language: {
      object: {
        min: '!!Group object must have at least 1 field to update.',
      }
    }
  }),

};

exports.indexes = [
  [ { org_id: 1 }, { unique: false, sparse: false } ],
  [ { created_by: 1 }, { unique: false, sparse: false } ],
  [ { org_id: 1, created_by: 1 }, { unique: false, sparse: false } ],
];
