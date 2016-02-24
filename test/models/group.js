
const inspect = require('util').inspect,
  joiHelpers = require('joi-helpers'),
  test = require('ava');


test.serial.cb('Group Model (Create_Group)', t => {

  const Method = DB.collections.group.methods.create_group;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = joiHelpers.validate(Method, Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 3);

  // Test #2
  Input = {
    org_id: 'sss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 3);

  // Test #3
  Input = {
    name: ''
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 3);

  // Test #4
  Input = {
    name: 'Superman',
    org_id: '56883c825a03cb66533a1781',
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #5
  Input = {
    name: 'Superman',
    org_id: '56883c825a03cb66533a1781',
    account_id: '56883c825a03cb66533a1781',
    some: 'super'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Test #6
  Input = {
    name: 'Superman',
    org_id: '56883c825a03cb66533a1781',
    account_id: '56883c825a03cb66533a1781',
    created_by: '56883c825a03cb66533a1781',
    some: 'super'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.active === true);
  t.ok(Result.value.org_id === '56883c825a03cb66533a1781');
  t.ok(Result.value.created_by === '56883c825a03cb66533a1781');
  t.ok(Result.value.created instanceof Date);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);

  // Print
  // console.log(inspect(Result, { depth: null }));

  t.end();
});

test.serial.cb('Group Model (Update_Group)', t => {

  const Method = DB.collections.group.methods.update_group;
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
    id: '56883c825a03cb66533a1781',
    name: 'Karan',
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.name);

  // Test #5
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

  // Test #6
  Input = {
    id: '56883c825a03cb66533a1781',
    active: 'sss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

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
