
const test = require('ava'),
  mongoDB = require('mongodb-client');

// Global Logger
require('logger')({ level: 'debug' });


// Connect to Mongodb:
test.before.serial(t => {

  return mongoDB.connect({
    mongoUrl: process.env.MONGO_URL,
    debug: false
  })
  .then(db => {
    global.DB = db;
    return require('../')({
      db: db
    });
  })
  .then(result => {
    global.Middleware = result.Middleware;
    global.Services = result.Services;
  });
});

// Fake Delay
// test.before.serial.cb(t => {
  // setTimeout(() => { t.end() }, 2500);
// // });

// require('./models/account');
// require('./models/org');
// require('./models/permission');

//**** LATER ****** //
// require('./models/group');

// Lib
// require('./lib/crypto');

// Account
// require('./services/create_account');
// require('./services/login');
// require('./services/update_account');
// require('./services/get_account');

// Org
// require('./services/create_org');
// require('./services/update_org');

// Permission
// require('./services/create_permission');
// require('./services/update_permission');

// Token
// require('./services/create_token');
// require('./services/validate_token');

// //**** LATER ****** //
// require('./services/create_group');
// require('./services/update_group');

// Middleware
require('./middleware/login');
require('./middleware/auth_route');
require('./middleware/get_account');
require('./middleware/update_account');
