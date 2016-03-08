
const inspect = require('util').inspect,
  joiHelpers = require('joi-helpers'),
  test = require('ava');


test.serial.cb('Permission Model (Create_Permission)', t => {

  const Method = DB.collections.permission.methods.create_permission;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 3);

  // Test #2
  Input = {
    account_id: 'sss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 3);

  // Test #3
  Input = {
    account_id: '56883c825a03cb66533a1781',
    org_id: '56883c825a03cb66533a1781'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #4
  Input = {
    account_id: '56883c825a03cb66533a1781',
    org_id: '56883c825a03cb66533a1781',
    roles: 'ssfsdfsd'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #5
  Input = {
    account_id: '56883c825a03cb66533a1781',
    org_id: '56883c825a03cb66533a1781',
    roles: []
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #6
  Input = {
    account_id: '56883c825a03cb66533a1781',
    org_id: '56883c825a03cb66533a1781',
    roles: ['super']
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #6
  Input = {
    account_id: '56883c825a03cb66533a1781',
    org_id: '56883c825a03cb66533a1781',
    roles: ['member', 'system.owner'],
    some: 'blah'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.account_id === '56883c825a03cb66533a1781');
  t.ok(Result.value.org_id === '56883c825a03cb66533a1781');
  t.ok(Array.isArray(Result.value.roles));
  t.ok(Result.value.created instanceof Date);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);

  // Print
  // console.log(inspect(Result, { depth: null }));

  t.end();
});

test.serial.cb('Permission Model (Update_Roles)', t => {

  const Method = DB.collections.permission.methods.update_permission;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #2
  Input = {
    account_id: 'sss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #4
  Input = {
    roles: 'ssfsdfsd'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #5
  Input = {
    roles: []
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #6
  Input = {
    roles: ['super']
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #7
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    roles: ['member', 'system.owner', 'crap'],
    some: 'blah'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.account_id === undefined);
  t.ok(Result.value.org_id === undefined);
  t.ok(Array.isArray(Result.value.roles));
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);

  // Test #8
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    roles: null,
    some: 'blah'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.roles === null);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);

  // Test #10
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    roles: null,
    some: 'blah',
    groups: 'ssfsdfsd'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #11
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    roles: null,
    some: 'blah',
    groups: null
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #12
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    roles: null,
    some: 'blah',
    groups: ['ssfsdfsd']
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.value.roles === null);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);
  t.ok(Array.isArray(Result.value.groups));

  // Test #13
  Input = {
    roles: null,
    some: 'blah',
    groups: ['56883c825a03cb66533a1781', '56883c825a03cb66533a1781']
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.value.roles === null);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);
  t.ok(Array.isArray(Result.value.groups));
  t.ok(Result.value.groups.length === 2);

  // Test #14
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    roles: null,
    some: 'blah',
    groups: ['22ss', '56883c825a03cb66533a1781']
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.value.roles === null);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);
  t.ok(Array.isArray(Result.value.groups));
  t.ok(Result.value.groups.length === 1);

  // Test #15
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    removeRoles: 'haaaaa'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #16
  Input = {
    id: '56be1d2a54d12187e6ee764e',
    removeRoles: false
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Print
  // console.log(inspect(Result, { depth: null }));

  t.end();
});
