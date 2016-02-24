# authority

__Note:__ Assumes [logger](https://github.com/launchunit/logger) is running.

----


## Usage

```js
const Accounts = require('node-accounts');

/**
 * @params {Db Instance} opts.db (Required)
 *
 * @return {Promise}
 * @public
 */
Accounts({
  db: db
})
.then(function(services) {

  // services.account

  /**
   * @params {String} input.email (Required)
   * @params {Object} input.password (Required)
   * @params {Object} input.password_confirm (Required)
   *
   * @params {Object} input.active (Optional Default=true)
   * @params {Object} input.timezone (Optional)
   * @params {Object} input.email_verified (Optional)
   *
   * @public
   */
  function createAccount(input)


})
.catch(function(e) {
  console.log(e);
});
```

#### Built-In-Roles

```js
{
  system: {
    owner: true,
    admin: true,
    member: true,
    guest: true,
  },
  org: {
    owner: true,
    admin: true,
    billing: true,
    manager: true,
    member: true,
    guest: true,
  },
  member: true,
  guest: true,
};
```

------

#### Run Tests

```bash
$ npm test

# OR for continuous testing
$ nodemon --exec "npm test"
```
