
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.createOrg;
});


test.serial('createOrg (No Arguments)', t => {

  var Input = {};

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 2);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createOrg (Name Argument & Invalid account_id)', t => {

  var Input = {
    account_id: '56be1d2a54d12187e6ee764x',
    name: 'super'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createOrg (Name Argument & account_id Not Found)', t => {

  var Input = {
    account_id: '56be1d2a54d12187e6ee764b',
    name: 'super'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createOrg (Name Argument & account_id is Not Active)', t => {

  var Input = {
    account_id: '56be1d2a54d12187e6ee764e',
    name: 'super'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createOrg (Valid Name and id)', t => {

  Input = {
    account_id: '56be1d2a54d12187e6ee764d',
    name: 'superman org'
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
