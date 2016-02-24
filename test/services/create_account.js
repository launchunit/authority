
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.createAccount;
});


test.serial('createAccount (No Arguments)', t => {

  var Input = {};

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 2);
    t.ok(Result.error[0].path === 'password');
    t.ok(Result.error[1].path === 'password_confirm');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createAccount (Only Password - Short Password)', t => {

  var Input = {
    password: 'kevin'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 2);
    t.ok(Result.error[0].path === 'password');
    t.ok(Result.error[1].path === 'password_confirm');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createAccount (No Password Confirm)', t => {

  var Input = {
    password: 'kevin123'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);
    t.ok(Result.error[0].path === 'password_confirm');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createAccount (Password & Password Confirm Dont Match)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin124'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);
    t.ok(Result.error[0].path === 'password_confirm');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createAccount (Password & Password Confirm Match But No Email)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin123'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);
    t.ok(Result.error[0].path === 'email');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createAccount (Password & Password Confirm Match and Invalid Email)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin123',
    email: 'kat@gmailcom'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);
    t.ok(Result.error[0].path === 'email');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createAccount (Password & Password Confirm Match and Valid Email, But Already Exists)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin123',
    email: 'kevin@gmail.com'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);
    t.ok(Result.error[0].path === 'email');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createAccount (Password & Password Confirm Match and Valid Email)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin123',
    email: `kevin_${Date.now()}@gmail.com`
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error === undefined);
    t.ok(Result.result);
    t.ok(Result.result.id);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createAccount (Invalid Timezone)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin123',
    email: `kevin_${Date.now()}@gmail.com`,
    timezone: 'blaasss'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);
    t.ok(Result.error[0].path === 'timezone');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});
