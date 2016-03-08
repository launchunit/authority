
const test = require('ava'),
  BodyParser = require('body-parser'),
  getPort = require('get-port'),
  got = require('got');


var BaseUrl,
  App = require('cortado').ApiServer();


test.before.cb(t => {

  getPort().then(port => {
    BaseUrl = `http://localhost:${port}`;
    App.Server.use(BodyParser.urlencoded());
    App.Server.post('/login', Middleware.login);
    App.Server.listen(port, t.end);
  });
});


test.serial('Login Middleware - No Arguments', t => {

  // Make Request
  return got(`${BaseUrl}/login`, {
    method: 'post',
    json: true
  })
  .catch(result => {

    t.ok(result.response.statusCode === 400);
    t.ok(result.response.body.message);
    t.ok(result.response.body.code === 'invalid_request');

    // console.log(result.response.body);
  });
});


test.serial('Login Middleware - Invalid Arguments', t => {

  // Make Request
  return got(`${BaseUrl}/login`, {
    method: 'post',
    json: true,
    body: {
      password: 'kevin123',
      email: 'kat@gmailcom'
    }
  })
  .catch(result => {

    t.ok(result.response.statusCode === 400);
    t.ok(result.response.body.message);
    t.ok(result.response.body.code === 'invalid_request');

    // console.log(result.response.body);
  });
});


test.serial('Login Middleware - Valid Arguments', t => {

  // Make Request
  return got(`${BaseUrl}/login`, {
    method: 'post',
    json: true,
    body: {
      password: 'kevin123',
      email: 'kevin@gmail.com'
    }
  })
  .then(result => {

    t.ok(result.statusCode === 200);
    t.ok(result.body.data.token);
    t.ok(result.body.data.id);

    // console.log(result.body);
  });
});
