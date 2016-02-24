
'use strict';


/**
 * Module dependencies.
 * @private
 */
const mongoDB = require('mongodb-client');


/**
 * @params {Db Instance} opts.db (Required)
 * @params {Sting} hmacSalt (Optional)
 *
 * @return {Object}
 * @public
 */
exports.Account = opts => {

  opts = Object.assign({
    hmacSalt: 'SvRoxdzS9kuuUZj1k_x=kclb4fdsFvmB'
  }, opts);


  if (typeof opts.db !== 'object') {
    throw new Error('opts.db (mongoDB instance) is reqiured.');
  }

  // Load the Models
  mongoDB.loadModels(__dirname + '/models');
  mongoDB.initModels({
    db: opts.db.db || opts.db
  });

  // Build Services Object
  const Services = Object.assign({},
    require('./services/account')(opts.db),
    require('./services/org')(opts.db),
    require('./services/group')(opts.db),
    require('./services/permission')(opts.db),
    require('./services/token')(opts.hmacSalt)
  );

  return Services;
};


/**
 * @params {Object} accountServices (Required)
 *
 * @return {Promise}
 * @public
 */
// exports.Route = require('./services/authorize_route');

