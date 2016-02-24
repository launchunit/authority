
const inspect = require('util').inspect,
  joiHelpers = require('joi-helpers'),
  uuid = require('node-uuid'),
  test = require('ava');


test.serial.cb('Account Model (Reset_Password)', t => {

  const Method = DB.collections.account.methods.reset_password;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);
  t.ok(Result.error[0].path === 'reset_token');
  t.ok(Result.error[1].path === 'reset_expiry');

  // Test #2
  Input = { reset_expiry: null };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);
  t.ok(Result.error[0].path === 'reset_token');

  // Test #3
  Input = { reset_token: null };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);
  t.ok(Result.error[0].path === 'reset_expiry');

  // Test #4
  Input = { reset_token: 'sdfsdf' };
  Result = joiHelpers.validate(Method, Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #5
  Input = {
    reset_token: 'sdfsdf',
    reset_expiry: 'sdfdsf'
  };
  Result = joiHelpers.validate(Method, Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #6
  Input = {
    reset_token: null,
    reset_expiry: null
  };
  Result = joiHelpers.validate(Method, Input);
  t.ok(Result.error === null);
  t.ok(Result.value);
  t.ok(Result.value.reset_expiry === null);
  t.ok(Result.value.reset_token === null);

  // Test #7
  Input = {
    reset_token: uuid(),
    reset_expiry: new Date()
  };
  Result = joiHelpers.validate(Method, Input);
  t.ok(Result.error === null);
  t.ok(Result.value);
  t.ok(Result.value.reset_expiry instanceof Date);
  t.ok(Result.value.reset_token);

  // Test #8
  Input = {
    reset_token: null,
    reset_expiry: new Date()
  };
  Result = joiHelpers.validate(Method, Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #9
  Input = {
    reset_token: uuid(),
    reset_expiry: null
  };
  Result = joiHelpers.validate(Method, Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Print
  // console.log(inspect(Result, { depth: null }));
  t.end();
});

test.serial.cb('Account Model (Update_Login)', t => {

  const Method = DB.collections.account.methods.update_login;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.last_login instanceof Date);
  t.ok(Result.value.reset_expiry === null);
  t.ok(Result.value.reset_token === null);

  // Test #2
  Input = {
    last_login: 'sss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #3
  Input = {
    last_login: new Date()
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.last_login instanceof Date);
  t.ok(Result.value.reset_expiry === null);
  t.ok(Result.value.reset_token === null);

  // Print
  // console.log(inspect(Result, { depth: null }));

  t.end();
});

test.serial.cb('Account Model (Create_Account)', t => {

  const Method = DB.collections.account.methods.create_account;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #2
  Input = {
    email: 'sss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #3
  Input = {
    email: 'kev@gmail.com',
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #4
  Input = {
    email: 'kev@gmail.com',
    password: 'sfsdfsd',
    some: 'ssss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #5
  Input = {
    email: 'kev@gmail.com',
    password: '6cbe615c106f422d23669b610b564800',
    some: 'ssss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.email_verified === false);
  t.ok(Result.value.active === true);
  t.ok(Result.value.reset_token === null);
  t.ok(Result.value.reset_expiry === null);
  t.ok(Result.value.created instanceof Date);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);
  t.ok(Result.value.timezone === 'america/new_york');

  // Test #6
  Input = {
    email: 'kev@gmail.com',
    password: '6cbe615c106f422d23669b610b564800',
    some: 'ssss',
    timezone: 'blah'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #6
  Input = {
    email: 'kev@gmail.com',
    password: '6cbe615c106f422d23669b610b564800',
    some: 'ssss',
    timezone: 'america/phoenix    '
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.email_verified === false);
  t.ok(Result.value.active === true);
  t.ok(Result.value.reset_token === null);
  t.ok(Result.value.reset_expiry === null);
  t.ok(Result.value.created instanceof Date);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);
  t.ok(Result.value.timezone === 'america/phoenix');

  // Print
  // console.log(inspect(Result, { depth: null }));

  t.end();
});

test.serial.cb('Account Model (Update_Account)', t => {

  const Method = DB.collections.account.methods.update_account;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #2
  Input = {
    active: 'sss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #3
  Input = {
    first_name: false,
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Result.error.length === 2);

  // Test #4
  Input = {
    first_name: '',
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Result.error.length === 2);

  // Test #5
  Input = {
    first_name: '',
    last_name: false
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Result.error.length === 3);

  // Test #6
  Input = {
    first_name: '',
    last_name: ''
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Result.error.length === 3);

  // Test #7
  Input = {
    id: 'xxxx',
    first_name: 'Karan',
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Result.error.length === 1);

  // Test #7
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    first_name: 'Karan',
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.first_name);

  // Test #8
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    first_name: 'Karan',
    last_name: ''
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Result.error.length === 1);

  // Test #9
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    gender: 'sssss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Result.error.length === 1);

  // Test #10
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    gender: 'Male '
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.gender === 'male');

  // Test #11
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    timezone: 'Karan',
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Result.error.length === 1);

  // Test #12
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    active: false,
    gender: 'Male '
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.gender === 'male');
  t.ok(Result.value.active === false);

  // Print
  // console.log(inspect(Result, { depth: null }));

  t.end();
});

test.serial('Account Model (Password_Confirm)', t => {

  const Method = DB.collections.account.methods.create_account_password_confirm;
  var Input = {}, Result;

  // Test #1
  Input = {};
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #2
  Input = {
    password: 'sss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #3
  Input = {
    password: 'superman'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #4
  Input = {
    password: 'superman',
    password_confirm: 'super'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #5
  Input = {
    password: 'superman',
    password_confirm: 'superman'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.password_confirm === undefined);
  t.ok(Result.value.password === 'superman');


  // Print
  // console.log(inspect(Result, { depth: null }));
});
