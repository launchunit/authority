
const test = require('ava');
var Crypto;

const pass = 'test123';
const hash = '$2a$08$j224VXv3Ox2Ewuzx7N3H2OWCpx67HVmVLosGAmZZspHdTWLU2jkJ6';


test.before(t => {
  Crypto = require('../../lib/crypto');
});

test('Crypto', t => {
  t.ok(typeof Crypto === 'object');
});

test('Crypto - hash', t => {

  return Crypto.hash(pass)
  .then(hash => {
    t.ok(typeof hash === 'string');
  });
});

test('Crypto - compare', t => {

  return Crypto.compare(pass, hash)
  .then(result => {
    t.ok(result === true);
  });
});

test('Crypto - compare (false test)', t => {

  return Crypto.compare(pass, hash + '_')
  .then(result => {
    t.ok(result === false);
  });
});
