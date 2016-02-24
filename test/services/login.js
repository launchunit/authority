
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.login;
});


test.serial('login (No Arguments)', t => {

  var Input = {};

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('login (Only Password - Short Password)', t => {

  var Input = {
    password: 'kevin'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('login (Password and Invalid Email)', t => {

  var Input = {
    password: 'kevin123',
    email: 'kat@gmailcom'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('login (Password and Valid Email)', t => {

  var Input = {
    password: 'kevin123',
    email: 'kevin@gmail.com'
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
