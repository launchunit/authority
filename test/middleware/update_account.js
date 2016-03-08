
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


test.serial('updateAccount Middleware - Token Header w/ Roles - No Data Posted', t => {

  App.Server.post('/blah1',
    Middleware.authorizeRoute(['member','system.admin']),
    Middleware.updateAccount);

  // Make Request
  return got(`${BaseUrl}/blah1`, {
    json: true,
    method: 'post',
    headers: {
      'x-session-token': 'Fe26.2**3116cfa7bb653fa757779fd2823e967ae81224931aa7cf5a167789b87f90a8a3*N9B--Q3Us6lemZDM57euHw*KoI5DZRwknfxgEXnfnNo6IEGnnj9hv6avpP1I2ZnnJBKCIJzWf8RK2o-kW0PLti_F6ylgTO6eCu-FxeHga5p6Q**c85365ada9c4b1efaa70be9f28a1498dc8135a4679c9033b969d910eb6c15cec*BTl9Q-V6ig9B4F9KeM7iBF3Y1tzwSzwIPKA1b7ZDs-I'
    }
  })
  .catch(result => {

    t.ok(result.response.statusCode === 400);
    t.ok(result.response.body.code === 'invalid_request');

    // console.log(result.response.body);
  });
});


test.serial('updateAccount Middleware - Token Header w/ Roles - No Data Posted', t => {

  App.Server.post('/blah1',
    Middleware.authorizeRoute(['member','system.admin']),
    Middleware.updateAccount);

  // Make Request
  return got(`${BaseUrl}/blah1`, {
    json: true,
    method: 'post',
    body: {
      super: 'Man'
    },
    headers: {
      'x-session-token': 'Fe26.2**3116cfa7bb653fa757779fd2823e967ae81224931aa7cf5a167789b87f90a8a3*N9B--Q3Us6lemZDM57euHw*KoI5DZRwknfxgEXnfnNo6IEGnnj9hv6avpP1I2ZnnJBKCIJzWf8RK2o-kW0PLti_F6ylgTO6eCu-FxeHga5p6Q**c85365ada9c4b1efaa70be9f28a1498dc8135a4679c9033b969d910eb6c15cec*BTl9Q-V6ig9B4F9KeM7iBF3Y1tzwSzwIPKA1b7ZDs-I'
    }
  })
  .catch(result => {

    t.ok(result.response.statusCode === 400);
    t.ok(result.response.body.code === 'invalid_request');

    // console.log(result.response.body);
  });
});


test.serial('updateAccount Middleware - Token Header w/ Roles - Invalid Email Data Posted', t => {

  App.Server.post('/blah1',
    Middleware.authorizeRoute(['member','system.admin']),
    Middleware.updateAccount);

  // Make Request
  return got(`${BaseUrl}/blah1`, {
    json: true,
    method: 'post',
    body: {
      super: 'Man',
      email: 'eeee@sdfd'
    },
    headers: {
      'x-session-token': 'Fe26.2**3116cfa7bb653fa757779fd2823e967ae81224931aa7cf5a167789b87f90a8a3*N9B--Q3Us6lemZDM57euHw*KoI5DZRwknfxgEXnfnNo6IEGnnj9hv6avpP1I2ZnnJBKCIJzWf8RK2o-kW0PLti_F6ylgTO6eCu-FxeHga5p6Q**c85365ada9c4b1efaa70be9f28a1498dc8135a4679c9033b969d910eb6c15cec*BTl9Q-V6ig9B4F9KeM7iBF3Y1tzwSzwIPKA1b7ZDs-I'
    }
  })
  .catch(result => {

    t.ok(result.response.statusCode === 400);
    t.ok(result.response.body.code === 'invalid_request');

    // console.log(result.response.body);
  });
});


test.serial('updateAccount Middleware - Token Header w/ Roles - Email Taken Data Posted', t => {

  App.Server.post('/blah1',
    Middleware.authorizeRoute(['member','system.admin']),
    Middleware.updateAccount);

  // Make Request
  return got(`${BaseUrl}/blah1`, {
    json: true,
    method: 'post',
    body: {
      super: 'Man',
      email: 'kevin_1455299886982@gmail.com'
    },
    headers: {
      'x-session-token': 'Fe26.2**3116cfa7bb653fa757779fd2823e967ae81224931aa7cf5a167789b87f90a8a3*N9B--Q3Us6lemZDM57euHw*KoI5DZRwknfxgEXnfnNo6IEGnnj9hv6avpP1I2ZnnJBKCIJzWf8RK2o-kW0PLti_F6ylgTO6eCu-FxeHga5p6Q**c85365ada9c4b1efaa70be9f28a1498dc8135a4679c9033b969d910eb6c15cec*BTl9Q-V6ig9B4F9KeM7iBF3Y1tzwSzwIPKA1b7ZDs-I'
    }
  })
  .catch(result => {

    t.ok(result.response.statusCode === 400);
    t.ok(result.response.body.code === 'invalid_request');

    // console.log(result.response.body);
  });
});


test.serial('updateAccount Middleware - Token Header w/ Roles - First_Name Data Posted', t => {

  App.Server.post('/blah1',
    Middleware.authorizeRoute(['member','system.admin']),
    Middleware.updateAccount);

  // Make Request
  return got(`${BaseUrl}/blah1`, {
    json: true,
    method: 'post',
    body: {
      super: 'Man',
      first_name: 'superman'
    },
    headers: {
      'x-session-token': 'Fe26.2**3116cfa7bb653fa757779fd2823e967ae81224931aa7cf5a167789b87f90a8a3*N9B--Q3Us6lemZDM57euHw*KoI5DZRwknfxgEXnfnNo6IEGnnj9hv6avpP1I2ZnnJBKCIJzWf8RK2o-kW0PLti_F6ylgTO6eCu-FxeHga5p6Q**c85365ada9c4b1efaa70be9f28a1498dc8135a4679c9033b969d910eb6c15cec*BTl9Q-V6ig9B4F9KeM7iBF3Y1tzwSzwIPKA1b7ZDs-I'
    }
  })
  .then(result => {

    t.ok(result.statusCode === 200);
    t.ok(result.body.data.id);

    // console.log(result.body.data);
  });
});
