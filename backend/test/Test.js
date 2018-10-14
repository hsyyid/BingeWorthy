// Load sensitive variables from .env
require('dotenv').config();

const gravatar = require('../src/api/gravatar.js');
const spotify = require('../src/api/spotify.js');
const getstream = require('../src/api/getstream.js');

const chai = require("chai");
const expect = chai.expect;

// Note: TESTING ONLY
const spotifyAccessToken = "***REMOVED***";

describe('Test', function() {
  this.timeout(0);

  it('/user/gravatar', async () => {
    let email = 'joe4sail@gmail.com';
    let gravURL = await gravatar.getLink(email);
    console.log("Response Body: [" + JSON.stringify(gravURL, null, 2) + "]");

    expect(gravURL).to.not.be.undefined;
  });

  it("/user/currently-playing", async () => {
    let response = await spotify.GetCurrentlyPlaying("955b95d5-9d53-43da-8789-960934e7e5c0");
    console.log("Response Body: [" + JSON.stringify(response, null, 2) + "]");

    expect(response).to.not.be.undefined;
  });

  it("/user/stream/post", async () => {
    let response = await getstream.Post("955b95d5-9d53-43da-8789-960934e7e5c0", "listen", "Greenday", "Greenday is my jam.");
    console.log("Response Body: [" + JSON.stringify(response, null, 2) + "]");

    expect(response).to.not.be.undefined;
  });

  it("/user/stream/update", async () => {
    let profileImage = await gravatar.getLink("songya@umich.edu") + "?s=200";
    let response = await getstream.UpdateUser("46221cd4-e63e-4709-9e64-86c8ddacd2dd", {
      name: 'Alex Song',
      desc: 'UMich',
      profileImage,
      coverImage: 'https://i0.wp.com/photos.smugmug.com/Portfolio/Full/i-mwrhZK2/0/ea7f1268/X2/GothamCity-X2.jpg?resize=1280%2C743&ssl=1'
    });
    console.log("Response Body: [" + JSON.stringify(response, null, 2) + "]");

    expect(response).to.not.be.undefined;
  });

  it.only("/user/stream/follow", async () => {
    let response = await getstream.FollowUser("955b95d5-9d53-43da-8789-960934e7e5c0", "46221cd4-e63e-4709-9e64-86c8ddacd2dd");
    console.log("Response Body: [" + JSON.stringify(response, null, 2) + "]");

    expect(response).to.not.be.undefined;
  });
});
