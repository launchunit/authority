
const test = require('ava'),
  BodyParser = require('body-parser'),
  getPort = require('get-port'),
  got = require('got');


var BaseUrl,
  App = require('cortado').ApiServer();


test.before.cb(t => {

  getPort().then(port => {
    BaseUrl = `http://localhost:${port}`;
    App.Server.use(BodyParser());
    App.Server.listen(port, t.end);
  });
});


test.serial('getAccount Middleware - Token Header w/ Roles', t => {

  App.Server.get('/blah1',
    Middleware.authorizeRoute(['member','system.admin']),
    Middleware.getAccount);

  // Make Request
  return got(`${BaseUrl}/blah1`, {
    json: true,
    headers: {
      'x-session-token': 'Fe26.2**3116cfa7bb653fa757779fd2823e967ae81224931aa7cf5a167789b87f90a8a3*N9B--Q3Us6lemZDM57euHw*KoI5DZRwknfxgEXnfnNo6IEGnnj9hv6avpP1I2ZnnJBKCIJzWf8RK2o-kW0PLti_F6ylgTO6eCu-FxeHga5p6Q**c85365ada9c4b1efaa70be9f28a1498dc8135a4679c9033b969d910eb6c15cec*BTl9Q-V6ig9B4F9KeM7iBF3Y1tzwSzwIPKA1b7ZDs-I'
    }
  })
  .then(result => {

    t.ok(result.statusCode === 200);
    t.ok(result.body.data);
    t.ok(result.body.data.id);
    t.ok(result.body.data.permission);
    t.ok(result.body.data.active);

    // console.log(result.body.data);
  });
});


test.serial('getAccount Middleware - Invalid Token Header', t => {

  App.Server.get('/blah2',
    Middleware.authorizeRoute(['member','system.admin']),
    Middleware.getAccount);

  // Make Request
  return got(`${BaseUrl}/blah2`, {
    json: true,
    headers: {
      'x-session-token': 'Ge26.2**3116cfa7bb653fa757779fd2823e967ae81224931aa7cf5a167789b87f90a8a3*N9B--Q3Us6lemZDM57euHw*KoI5DZRwknfxgEXnfnNo6IEGnnj9hv6avpP1I2ZnnJBKCIJzWf8RK2o-kW0PLti_F6ylgTO6eCu-FxeHga5p6Q**c85365ada9c4b1efaa70be9f28a1498dc8135a4679c9033b969d910eb6c15cec*BTl9Q-V6ig9B4F9KeM7iBF3Y1tzwSzwIPKA1b7ZDs-I'
    }
  })
  .catch(result => {

    t.ok(result.response.statusCode === 401);
    t.ok(result.response.body.code === 'not_authorized');

    // console.log(result.response.body);
  });
});
