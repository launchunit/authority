
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.createGroup;
});


test.serial('createGroup (No Arguments or org_id)', t => {

  var Input = {};

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('createGroup (No Arguments and Invalid _id)', t => {

  var Input = {
    account_id: '56bb7dbcfcd347b76bb8843x'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    console.log(inspect(Result, { depth: null }));
  });
});

// test.serial('createGroup (No Arguments and Invalid org_id)', t => {

//   var Input = {
//     account_id: '56bb7dbcfcd347b76bb88435',
//     org_id: '56bb7dbcfcd347b76bb8843x'
//   };

//   return Fn(Input)
//   .then(Result => {

//     t.ok(Result.error);
//     t.ok(Result.error.length === 1);

//     // Print
//     // console.log(inspect(Result, { depth: null }));
//   });
// });

// test.serial('createGroup (No Arguments)', t => {

//   var Input = {
//     account_id: '56bb7dbcfcd347b76bb88435',
//     org_id: '56bb7dbcfcd347b76bb88435'
//   };

//   return Fn(Input)
//   .then(Result => {

//     t.ok(Result.error);
//     t.ok(Result.error.length === 1);
//     t.ok(Result.error[0].path === 'name');

//     // console.log(inspect(Result, { depth: null }));
//   });
// });

// test.serial('createGroup (Name Argument & account_id is Not Active)', t => {

//   var Input = {
//     account_id: '56be1d2a54d12187e6ee764e',
//     org_id: '56bb7dbcfcd347b76bb88435',
//     name: 'super group'
//   };

//   return Fn(Input)
//   .then(Result => {

//     t.ok(Result.error);
//     t.ok(Result.error.length === 1);

//     // console.log(inspect(Result, { depth: null }));
//   });
// });

// test.serial('createGroup (Name Argument & org_id Doesnt Exist)', t => {

//   var Input = {
//     account_id: '56be1d2a54d12187e6ee764d',
//     org_id: '56bb7dbcfcd347b76bb88435',
//     name: 'super group'
//   };

//   return Fn(Input)
//   .then(Result => {

//     t.ok(Result.error);
//     t.ok(Result.error.length === 1);

//     // console.log(inspect(Result, { depth: null }));
//   });
// });

// test.serial('createGroup (Valid Name, account_id & org_id)', t => {

//   Input = {
//     name: 'superman org',
//     account_id: '56be1d2a54d12187e6ee764d',
//     org_id: '56be1e169368a6a5e7f5fa8d'
//   };

//   return Fn(Input)
//   .then(Result => {

//     t.ok(Result.error === undefined);
//     t.ok(Result.result);
//     t.ok(Result.result.id);

//     // Print
//     console.log(inspect(Result, { depth: null }));
//   });
// });
