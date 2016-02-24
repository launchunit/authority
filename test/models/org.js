
const inspect = require('util').inspect,
  joiHelpers = require('joi-helpers'),
  test = require('ava');


test.serial.cb('Org Model (Create_Org)', t => {

  const Method = DB.collections.org.methods.create_org;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = joiHelpers.validate(Method, Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #2
  Input = {
    created_by: 'sss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #3
  Input = {
    name: ''
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #4
  Input = {
    name: 'Superman',
    account_id: '56883c825a03cb66533a178x',
    some: 'super'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #9
  Input = {
    name: 'Superman',
    created_by: '56883c825a03cb66533a1781',
    account_id: '56883c825a03cb66533a1781',
    some: 'super'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.active === true);
  t.ok(Result.value.account_id === '56883c825a03cb66533a1781');
  t.ok(Result.value.created instanceof Date);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);
  t.ok(Result.value.created_by === undefined);

  // Print
  // console.log(inspect(Result, { depth: null }));

  t.end();
});

test.serial.cb('Org Model (Update_Org)', t => {

  const Method = DB.collections.org.methods.update_org;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #2
  Input = {
    name: ''
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #3
  Input = {
    name: false,
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Result.error.length === 2);

  // Test #4
  Input = {
    account_id: '56883c825a03cb66533a178b',
    name: 'Karan',
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Result.error.length === 1);

  // Test #5
  Input = {
    id: 'x6883c825a03cb66533a1781',
    name: 'Karan',
  };
  Result = joiHelpers.validate(Method, Input);
  t.ok(Result.error);
  t.ok(Result.error.length === 1);

  // Test #6
  Input = {
    id: '56883c825a03cb66533a1781',
    name: 'Karan',
    description: 'super great '
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.name);
  t.ok(Result.value.description === 'super great');

  // Test #7
  Input = {
    active: 'sss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Test #7
  Input = {
    id: '56883c825a03cb66533a1781',
    active: false,
    some: 'blah'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.active === false);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);

  // Print
  // console.log(inspect(Result, { depth: null }));

  t.end();
});
