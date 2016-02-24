
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.updateAccount;
});


test.serial('updateAccount (No Arguments)', t => {

  var Input = {};

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateAccount (Invalid first_name)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    first_name: false
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateAccount (Valid first_name & Invalid last_name)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    first_name: 'Karan',
    last_name: false
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateAccount (Valid first_name & last_name)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    first_name: 'Karan',
    last_name: 'Sakhuja'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error === undefined);
    t.ok(Result.result);
    t.ok(Result.result.id);

    // Print
    console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateAccount (Invalid id)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764X',
    first_name: 'Karan',
    last_name: 'Sakhuja'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateAccount (id Doest Exist)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764b',
    first_name: 'Karan',
    last_name: 'Sakhuja'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateAccount (Invalid Email)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    email: false
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateAccount (Same as Current Email)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    email: 'kevin@gmail.com',
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error === undefined);
    t.ok(Result.result);
    t.ok(Result.result.id);

    // Print
    console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateAccount (Email is Used)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    email: 'kevin_1455299882461@gmail.com',
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updateAccount (Email Not Used)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    email: 'kevin_new@gmail.com',
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

test.serial('updateAccount (Back to Previous, Email Not Used)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    email: 'kevin@gmail.com',
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
