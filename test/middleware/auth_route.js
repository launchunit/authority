
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


test.serial('AuthRoute Middleware - No Token Header', t => {

  App.Server.get('/blah',
    Middleware.authorizeRoute(['guest']));

  // Make Request
  return got(`${BaseUrl}/blah`, {
    json: true
  })
  .catch(result => {

    t.ok(result.response.statusCode === 401);
    t.ok(result.response.body.message);
    t.ok(result.response.body.code === 'not_authorized');

    // console.log(result.response.body);
  });
});


test.serial('AuthRoute Middleware - Invalid Token Header', t => {

  App.Server.get('/blah2',
    Middleware.authorizeRoute(['guest']));

  // Make Request
  return got(`${BaseUrl}/blah2`, {
    json: true,
    headers: {
      'x-session-token': 'Be26.2**6b2344c9be2b968c51cbe003d723389f02af8c0267c486bc2a616185b1ba5de7*PCuKm51EVonFw727ELcVYQ*N6urKJRTCve16hr9S2XG7uMEmLL9H2lE-s37AYrrygnwVyj1QPOimStg0rScbIMDtjamKRZG3YnKYDK8XCVGQw**bee9ac959f8f319162aa5d4d5f9264010577c2d4844856b339e81aeafa925e07*AaiYYtzht9Anm-RABtag0rL_rH-1iR3vOj7ZBh107Sg'
    }
  })
  .catch(result => {

    t.ok(result.response.statusCode === 401);
    t.ok(result.response.body.message);
    t.ok(result.response.body.code === 'not_authorized');

    // console.log(result.response.body);
  });
});


test.serial('AuthRoute Middleware - Token Header w/o Roles', t => {

  App.Server.get('/blah2',
    Middleware.authorizeRoute(['guest']));

  // Make Request
  return got(`${BaseUrl}/blah2`, {
    json: true,
    headers: {
      'x-session-token': 'Fe26.2**6b2344c9be2b968c51cbe003d723389f02af8c0267c486bc2a616185b1ba5de7*PCuKm51EVonFw727ELcVYQ*N6urKJRTCve16hr9S2XG7uMEmLL9H2lE-s37AYrrygnwVyj1QPOimStg0rScbIMDtjamKRZG3YnKYDK8XCVGQw**bee9ac959f8f319162aa5d4d5f9264010577c2d4844856b339e81aeafa925e07*AaiYYtzht9Anm-RABtag0rL_rH-1iR3vOj7ZBh107Sg'
    }
  })
  .catch(result => {

    t.ok(result.response.statusCode === 401);
    t.ok(result.response.body.message);
    t.ok(result.response.body.code === 'not_authorized');

    // console.log(result.response.body);
  });
});


test.serial('AuthRoute Middleware - Token Header w/ Roles But Invalid Role', t => {

  App.Server.get('/blah3',
    Middleware.authorizeRoute(['guest']));

  // Make Request
  return got(`${BaseUrl}/blah3`, {
    json: true,
    headers: {
      'x-session-token': 'Fe26.2**cacb9098b39ae3d0205dc4b7704da0b16eac563a639c55b3bf41087b1d8f5b3b*YTgokUJk5F65CT5-W6loRw*_JnrUxRb6BQAMS4mVFcKC-mW1Vdn_tkVGyNJaG8GgA4-WCvs_cye2hengp6CXPu1**c7457b4b3e37d4d49b5093c456901618b56b288ae2d43e52ad6cfb8539dfcee1*BmmVPXowMvZeOG7fDm6n8dFl6V--37OHJDPQPLgRMgw'
    }
  })
  .catch(result => {

    t.ok(result.response.statusCode === 401);
    t.ok(result.response.body.message);
    t.ok(result.response.body.code === 'not_authorized');

    // console.log(result.response.body);
  });
});


test.serial('AuthRoute Middleware - Token Header w/ Roles But valid Role', t => {

  App.Server.get('/blah4',
    Middleware.authorizeRoute(['member','system.admin']),
    function(req, res, next) {

      // Testing req._session Object
      t.ok(req._session);
      t.ok(req._session.user);
      t.ok(req._session.user.id);
      t.ok(req._session.user.roles);
      // console.log(req._session.user);

      return res.writeJson({ data: true});
    });

  // Make Request
  return got(`${BaseUrl}/blah4`, {
    json: true,
    headers: {
      'x-session-token': 'Fe26.2**3116cfa7bb653fa757779fd2823e967ae81224931aa7cf5a167789b87f90a8a3*N9B--Q3Us6lemZDM57euHw*KoI5DZRwknfxgEXnfnNo6IEGnnj9hv6avpP1I2ZnnJBKCIJzWf8RK2o-kW0PLti_F6ylgTO6eCu-FxeHga5p6Q**c85365ada9c4b1efaa70be9f28a1498dc8135a4679c9033b969d910eb6c15cec*BTl9Q-V6ig9B4F9KeM7iBF3Y1tzwSzwIPKA1b7ZDs-I'
    }
  })
  .then(result => {

    t.ok(result.statusCode === 200);
    t.ok(result.body.data.data);

    // console.log(result.body.data);
  });
});
