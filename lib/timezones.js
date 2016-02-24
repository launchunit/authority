
'use strict';

/**
 * Module dependencies.
 * @private
 */
const deepFreeze = require('deep-freeze');


module.exports = deepFreeze({
  'Pacific/Honolulu': '(GMT-10:00) Hawaii Time',
  'America/Anchorage': '(GMT-09:00) Alaska Time',
  'America/Los_Angeles': '(GMT-08:00) Pacific Time',
  'America/Denver': '(GMT-07:00) Mountain Time',
  'America/Phoenix': '(GMT-07:00) Mountain Time - Arizona',
  'America/Chicago': '(GMT-06:00) Central Time',
  'America/New_York': '(GMT-05:00) Eastern Time'
});
