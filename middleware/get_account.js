
'use strict';


module.exports = Services => {

  return function getAccount(req, res, next) {

    Services.getAccount(req.body)
    .then(Result => {


    })
    .catch(err => {


    });

  };
};
