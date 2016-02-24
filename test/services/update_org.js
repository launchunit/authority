
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.updateOrg;
});


test.serial('updateOrg (No Arguments)', t => {

  var Input = {};

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateOrg (Invalid name)', t => {

  var Input = {
    id: '56be1e169368a6a5e7f5fa8d',
    name: false
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateOrg (Valid name, but Invalid active)', t => {

  var Input = {
    id: '56be1e169368a6a5e7f5fa8d',
    name: 'Karan',
    active: 'Sakhuja'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateOrg (Valid name & active)', t => {

  var Input = {
    id: '56be1e169368a6a5e7f5fa8d',
    name: 'Karan',
    active: true,
    description: 'Something Rad.'
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

test.serial('updateOrg (Invalid id)', t => {

  var Input = {
    id: '56be1e169368a6a5e7f5fa8X',
    name: 'Karan',
    active: false
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateOrg (id Doest Exist)', t => {

  var Input = {
    id: '56be1e169368a6a5e7f5fa8a',
    name: 'Karan',
    active: false
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});
