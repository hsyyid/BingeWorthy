// Load sensitive variables from .env
require('dotenv').config();

const underTest = require('../src/api/spotify.js');

const chai = require("chai");
const expect = chai.expect;

// Note: TESTING ONLY
const spotifyAccessToken = "***REMOVED***";

describe('Test', function() {
  this.timeout(0);

  it("/user/currently-playing", async () => {
    let response = await underTest.GetCurrentlyPlaying(undefined, spotifyAccessToken);
    console.log("Response Body: [" + JSON.stringify(response, null, 2) + "]");

    expect(response).to.not.be.undefined;
  });
});
