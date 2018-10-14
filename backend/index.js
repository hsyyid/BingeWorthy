// Load sensitive variables from .env
require('dotenv').config();

const ApiBuilder = require('claudia-api-builder'),
  fetch = require("node-fetch"),
  spotify = require("./src/api/spotify.js"),
  cognito = require("./src/api/cognito.js"),
  getstream = require("./src/api/getstream.js"),
  db = require("./src/api/db.js"),
  api = new ApiBuilder();

module.exports = api;

api.get('/user/spotify/currently-playing', async (req) => {
  let {identityId} = req.proxyRequest.queryStringParameters;
  let current_track = await spotify.GetCurrentlyPlaying(identityId);
  return current_track;
});

api.post('/user/stream/tokens/read-only', async (req) => {
  let {jwt} = req.body;
  let identityId = await cognito.GetPEMSAndValidateToken(jwt);

  return (await getstream.GetReadOnlyToken(identityId));
});

api.post('/user/stream/tokens/session', async (req) => {
  let {jwt} = req.body;
  let identityId = await cognito.GetPEMSAndValidateToken(jwt);

  return (await getstream.CreateUserSessionToken(identityId));
});

api.post('/user/stream/post', async (req) => {
  let {jwt, verb, object, message} = req.body;
  let identityId = await cognito.GetPEMSAndValidateToken(jwt);

  return (await getstream.Post(identityId, verb, object, message));
});

api.post('/user/stream/follow', async (req) => {
  let {jwt, other} = req.body;
  let identityId = await cognito.GetPEMSAndValidateToken(jwt);

  return (await getstream.Follow(identityId, other));
});

api.post('/user/stream/isfollowing', async (req) => {
  let {jwt, other} = req.body;
  let identityId = await cognito.GetPEMSAndValidateToken(jwt);

  return (await getstream.IsFollowingUser(identityId, other));
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
