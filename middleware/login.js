
'use strict';


module.exports = Services => {

  return function login(req, res, next) {

    Services.login(req.body)
    .then(Result => {


    })
    .catch(err => {


    });

  };
};
