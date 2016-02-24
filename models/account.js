
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  Joi = require('joi'),
  joiHelpers = require('joi-helpers'),
  Timezones = _.map(_.keys(
    require('../lib/timezones')), _.toLower);


/**
 * Account Model
 */
exports.name = 'account';

exports.schema = {

  // Basics
  email: Joi.string().lowercase().trim().email({ minDomainAtoms: 2 })
            .label('Email'),

  password:  Joi.string().trim().min(10)
                .options({ language: { string: {
                  min: 'Hashed {{key}} seems invalid.'
                }}}),

  // Meta
  active: Joi.boolean(),
  email_verified: Joi.boolean(),
  last_login: Joi.date().min('now').default(new Date),

  // Password Reset
  reset_token: Joi.alternatives().try(
                    Joi.string().guid(),
                    Joi.valid(null)
                  ),

  reset_expiry: Joi.when('reset_token', {
                    is: null,
                    then: Joi.valid(null),
                    otherwise: Joi.date()
                  }),
                  // .label('Password Reset Expiry'),

  // Profile
  first_name: Joi.string().trim().label('First Name'),
  last_name: Joi.string().trim().label('Last Name'),
  picture: Joi.string().lowercase().trim().uri(),
  bio: Joi.string().trim().label('Bio'),
  gender: joiHelpers.anyValid(
            Joi.string().trim().lowercase().label('Gender'),
            ['male', 'female', 'other']),
  timezone: joiHelpers.anyValid(
              Joi.string().trim().lowercase().label('Timezone'),
              Timezones),

  // Book-keeping
  created: Joi.date().min('now').default(new Date),
  updated: Joi.date().min('now').default(new Date)
};

exports.methods = {

  // Create New Account
  create_account: Joi.object({
    email: exports.schema.email,
    password: exports.schema.password,
    email_verified: exports.schema.email_verified.default(false),
    active: exports.schema.active.default(true),
    created: exports.schema.created,
    updated: exports.schema.updated,
    timezone: exports.schema.timezone.default(Timezones[6]), // Default=EST
    reset_token: exports.schema.reset_token.valid(null).default(null),
    reset_expiry: exports.schema.reset_expiry.valid(null).default(null)
  })
  .requiredKeys('email', 'password')
  .optionalKeys('reset_token', 'reset_expiry', 'timezone'),


  // Create Account Confirm Password
  create_account_password_confirm: Joi.object({
    password: Joi.string().min(6).label('Password'),
    password_confirm: Joi.any().valid(Joi.ref('password'))
                         .label('Password Confirmation').strip()
  })
  .requiredKeys('password', 'password_confirm')
  .options({
    language: {
      string: {
        min: '{{key}} must be at least {{limit}} characters long.'
      },
      any: {
        // allowOnly: '{{key}} must match {{valids.0.key}}.'
        allowOnly: '{{key}} must match Password.'
      }
    }
  }),


  // Update Account
  update_account: Joi.object({

    // For Services Only
    id: joiHelpers.objectId().required().strip(),

    email: exports.schema.email,
    active: exports.schema.active,
    email_verified: exports.schema.email_verified,

    // Profile
    first_name: exports.schema.first_name,
    last_name: exports.schema.last_name,
    picture: exports.schema.picture,
    bio: exports.schema.bio,
    gender: exports.schema.gender,
    updated: exports.schema.updated,
    timezone: exports.schema.timezone
  })
  .min(2)
  .options({
    language: {
      object: {
        min: '!!Account object must have at least 1 field to update.',
      }
    }
  }),


  // Get Account
  get_account: Joi.object({
    // For Services Only
    id: joiHelpers.objectId().required(),
  }),


  // Login
  login: Joi.object({
    email: exports.schema.email,
    password: Joi.string().min(6).label('Password')
  })
  .requiredKeys('email', 'password')
  .options({
    language: {
      any: {
        required: '!!Invalid email/password.'
      },
      string: {
        min: '!!Invalid email/password.'
      }
    }
  }),


  // Update Login
  update_login: Joi.object({
    last_login: exports.schema.last_login.default(new Date),
    reset_token: exports.schema.reset_token.default(null).valid(null),
    reset_expiry: exports.schema.reset_expiry.default(null).valid(null)
  })
  .optionalKeys('last_login', 'reset_token', 'reset_expiry'),


  /**********
   NOT USED IN SERVICES YET
   **********/

  // Password Reset
  reset_password: Joi.object({
    reset_token: exports.schema.reset_token,
    reset_expiry: exports.schema.reset_expiry
  })
  .requiredKeys('reset_token', 'reset_expiry')
  .options({
    language: {
      any: {
        allowOnly: 'Only specific values are allowed for {{key}}.'
      },
      string: {
        guid: 'Only specific values are allowed for {{key}}.'
      },
      date: {
        base: 'Only specific values are allowed for {{key}}.'
      }
    }
  }),


  /**********
   NOT USED IN SERVICES YET
   **********/

  // Update Password
  update_password: Joi.object({
    password: exports.schema.password,
    reset_token: exports.schema.reset_token.valid(null).default(null),
    reset_expiry: exports.schema.reset_expiry.valid(null).default(null),
    updated: exports.schema.updated,
  })
  .requiredKeys('password')
  .optionalKeys('reset_token', 'reset_expiry')
};

exports.indexes = [
  [ { email: 1 }, { unique: true, sparse: false } ],
  // [ { 'permissions.org_id': 1 }, { unique: true, sparse: false } ],
];
