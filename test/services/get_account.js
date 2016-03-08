
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.getAccount;
});


test.serial('getAccount (No Arguments)', t => {

  var Input = {};

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('getAccount (Invalid id)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764x',
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('getAccount (id Doest Exist)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764b',
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('getAccount (id Exist)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error === undefined);
    t.ok(Result.result);
    t.ok(Result.result.id);
    t.ok(Result.result.permission);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});
