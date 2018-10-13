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
  let {jwt, code} = req.body;
  let identityId = await cognito.GetPEMSAndValidateToken(jwt);
  console.log(`Authorizing: ${code} ... for ${identityId}`);

  let {access_token, refresh_token} = await spotify.AuthUser(code);
  console.log(`AccessToken: ${access_token}`);
  let profile = await spotify.GetUserProfile(access_token);
  console.log(`Got ID: ${profile && profile.id}`);
  await db.UpdateAttribute(identityId, "spotify", {refresh_token, id: profile.id});

  return {profile};
});
