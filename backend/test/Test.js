// Load sensitive variables from .env
require('dotenv').config();

const spotify = require('../src/api/spotify.js');
const getstream = require('../src/api/getstream.js');

const chai = require("chai");
const expect = chai.expect;

// Note: TESTING ONLY
const spotifyAccessToken = "***REMOVED***";

describe('Test', function() {
  this.timeout(0);

  it("/user/currently-playing", async () => {
    let response = await spotify.GetCurrentlyPlaying(undefined, spotifyAccessToken);
    console.log("Response Body: [" + JSON.stringify(response, null, 2) + "]");

    expect(response).to.not.be.undefined;
  });

  it.only("/user/stream/post", async () => {
    let response = await getstream.Post("955b95d5-9d53-43da-8789-960934e7e5c0", "listen", "The Blacker the Berry - Kendrick Lamar", "I love Kendrick.");
    console.log("Response Body: [" + JSON.stringify(response, null, 2) + "]");

    expect(response).to.not.be.undefined;
  });

  it("/user/stream/follow", async () => {
    let response = await getstream.FollowUser("955b95d5-9d53-43da-8789-960934e7e5c0", "955b95d5-9d53-43da-8789-960934e7e5c0");
    console.log("Response Body: [" + JSON.stringify(response, null, 2) + "]");

    expect(response).to.not.be.undefined;
  });
});
