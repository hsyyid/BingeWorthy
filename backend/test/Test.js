// Load sensitive variables from .env
require('dotenv').config();

const underTest = require('../index.js');
const gravatar = require('../src/api/gravatar.js');
const chai = require("chai");

chai.use(require('sinon-chai'));

const expect = chai.expect;
const sinon = require('sinon');

// TODO: Write test cases
describe('Test', function() {
  this.timeout(0);

  it("/user/currently-playing", async () => {
    let email = 'joe4sail@gmail.com';
    let gravURL = await gravatar.getLink(email);
    console.log("Response Body: [" + JSON.stringify(gravURL, null, 2) + "]");

    expect(gravURL).to.not.be.undefined;
  });
});
