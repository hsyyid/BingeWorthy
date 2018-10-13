// Load sensitive variables from .env
require('dotenv').config();

const ApiBuilder = require('claudia-api-builder'),
  fetch = require("node-fetch"),
  spotify = require("./src/api/spotify.js"),
  cognito = require("./src/api/cognito.js"),
  db = require("./src/api/db.js"),
  api = new ApiBuilder();

module.exports = api;

api.get('/user/currently-playing', async (req) => {
  let {identityId} = req.proxyRequest.queryStringParameters;
  let current_track = await spotify.GetCurrentlyPlaying(identityId);
  return current_track;
});

/**
* Used to authorize a user that logs in via Spotify
* and adds the Spotify ID to DynamoDB
*/
api.post('/auth', async (req) => {
  let {code} = req.body;
  console.log(`Authorizing: ${code}`);

  let {access_token, refresh_token} = await spotify.AuthUser(code);
  let profile = await spotify.GetUserProfile(access_token);
  console.log(`Got ID: ${profile && profile.id}`);

  let cognitoIdentity = await cognito.GetIdentity(profile.id);
  console.log(JSON.stringify(cognitoIdentity, null, 2));

  if (cognitoIdentity && cognitoIdentity.IdentityId) {
    await db.UpdateAttribute(cognitoIdentity.IdentityId, "spotify", {refresh_token, id: profile.id});
  }

  return {profile, cognitoIdentity};
});
