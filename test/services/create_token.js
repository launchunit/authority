
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.createToken;
});


test.serial('createToken (No Arguments)', t => {

  var Input = {};

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createToken (Invalid id)', t => {

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

test.serial('createToken (Valid id)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    org_id: '56be1d2a54d12187e6ee764b',
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error === undefined);
    t.ok(typeof Result.result === 'string');

    // Print
    // console.log(inspect(Result, { depth: null }));
  })
});

test.serial('createToken (Valid id But Invalid Roles)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    roles: '56be1d2a54d12187e6ee764b',
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  })
});

test.serial('createToken (Valid id But Invalid Roles)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    roles: ['56be1d2a54d12187e6ee764b'],
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  })
});

test.serial('createToken (Valid id But Invalid Roles)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    roles: ['member', 'system.admin'],
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error === undefined);
    t.ok(typeof Result.result === 'string');

    // Print
    // console.log(inspect(Result, { depth: null }));
  })
});
