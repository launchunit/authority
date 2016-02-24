
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.updatePermission;
});


test.serial('updatePermission (No Arguments)', t => {

  var Input = {};

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updatePermission (No roles Argument)', t => {

  var Input = {
    id: '56bb7dbcfcd347b76bb88435'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updatePermission (No roles Argument and Invalid id)', t => {

  var Input = {
    id: '56bb7dbcfcd347b76bb8843x',
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updatePermission (Valid id But Invalid roles Type)', t => {

  Input = {
    roles: 'superman org',
    id: '56be1e169368a6a5e7f5fa8d'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updatePermission (Valid roles but id Not Found)', t => {

  Input = {
    roles: null,
    id: '56be1e169368a6a5e7f5fa8d'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

// test.serial('updatePermission (Valid id and roles)', t => {

//   Input = {
//     roles: ['guest', 'org.owner'],
//     id: '56c0ff5a299c40311fa88ea3'
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

// test.serial('updatePermission (Valid id w/ removeRoles)', t => {

  // Input = {
  //   // roles: ['guest', 'org.owner'],
  //   removeRoles: true,
  //   id: '56c0ff5a299c40311fa88ea3'
  // };

  // return Fn(Input)
  // .then(Result => {

  //   // t.ok(Result.error === undefined);
  //   // t.ok(Result.result);
  //   // t.ok(Result.result.id);

  //   // Print
  //   console.log(inspect(Result, { depth: null }));
  // });
// });

// // test.serial('updatePermission (Valid id and roles = null)', t => {

// //   Input = {
// //     roles: null,
// //     removeRoles: true,
// //     id: '56c0ff5a299c40311fa88ea3'
// //   };

// //   return Fn(Input)
// //   .then(Result => {

//     // t.ok(Result.error === undefined);
//     // t.ok(Result.result);
//     // t.ok(Result.result.id);

//     // Print
// //     console.log(inspect(Result, { depth: null }));
// //   });
// // });
