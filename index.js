
'use strict';


/**
 * Module dependencies.
 * @private
 */
const mongoDB = require('mongodb-client');


/**
 * @params {Db Instance} opts.db (Required)
 * @params {Sting} opts.hmacSalt (Optional)
 * @params {Boolean} opts.simpleAuth (Default = true)
 *
 * @return {Object}
 * @public
 */
module.exports = opts => {

  opts = Object.assign({
    hmacSalt: 'SvRoxdzS9kuuUZj1k_x=kclb4fdsFvmB',
    simpleAuth: true
  }, opts);


  if (typeof opts.db !== 'object') {
    throw new Error('opts.db (mongoDB instance) is reqiured.');
  }

  // Load the Models
  mongoDB.loadModels(__dirname + '/models');
  mongoDB.initModels({
    db: opts.db.db || opts.db
  });

  // Services Object
  const Services = Object.assign({},
    require('./services/account')(opts.db),
    require('./services/org')(opts.db),
    require('./services/group')(opts.db),
    require('./services/permission')(opts.db),
    require('./services/token')(opts.hmacSalt, opts.db)
  );

  // Middleware Object
  const Middleware = Object.assign({},
    require('./middleware/login')(Services, opts),
    require('./middleware/authorize_route')(Services, opts),
    require('./middleware/get_account')(Services),
    require('./middleware/update_account')(Services)
  );

  return { Services, Middleware };
};
