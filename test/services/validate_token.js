
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.validateToken;
});


test.serial('validateToken (Object Token)', t => {

  var Input = {};

  return Fn(Input)
  .then(Result => {

    t.ok(Result.result === false);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('validateToken (Empty Token)', t => {

  var Input = '';

  return Fn(Input)
  .then(Result => {

    t.ok(Result.result === false);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('validateToken (Token)', t => {

  var Input = 'Fe26.2**6b2344c9be2b968c51cbe003d723389f02af8c0267c486bc2a616185b1ba5de7*PCuKm51EVonFw727ELcVYQ*N6urKJRTCve16hr9S2XG7uMEmLL9H2lE-s37AYrrygnwVyj1QPOimStg0rScbIMDtjamKRZG3YnKYDK8XCVGQw**bee9ac959f8f319162aa5d4d5f9264010577c2d4844856b339e81aeafa925e07*AaiYYtzht9Anm-RABtag0rL_rH-1iR3vOj7ZBh107Sg';

  return Fn(Input)
  .then(Result => {

    t.ok(Result.result);
    t.ok(Result.result.id);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});


test.serial('validateToken (Token w/ Roles)', t => {

  var Input = 'Fe26.2**3fcd0a07a52b064f4de68c87817317be34944c499332a41641452cb9169fbcd8*bA9b31aCCjFGSv_lucc9Sw*14PBKD8-tG3KLwuHRzEYUiQ4verN6fs51HE-l5ebtca2OT2x6PCa-B77g2Cp_d3pheJ2XDA4_XU92NyU9A06-5GMbiAHVLs3L7UHjFNf8xw**fcb428ff41bfff60e83f7482762efbb682c4550be0c5b12eecd2386e390280fd*Vau3J69BHCscRRl9t-uS6yDDtA-9jV87miF3HGtXFQE';

  return Fn(Input)
  .then(Result => {

    t.ok(Result.result);
    t.ok(Result.result.id);
    t.ok(Result.result.roles);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});
