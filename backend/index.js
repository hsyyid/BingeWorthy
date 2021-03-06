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

api.post('/user/spotify/isconnected', async (req) => {
  let {jwt} = req.body;
  let identityId = await cognito.GetPEMSAndValidateToken(jwt);
  let user = await db.GetUser(identityId);
  let connected = user.spotify && user.spotify.refresh_token;
  console.log("/user/spotify/isconnected: " + connected + " | " + JSON.stringify(user));

  return {connected};
});

api.post('/user/spotify/currently-playing', async (req) => {
  let {jwt} = req.body;
  let identityId = await cognito.GetPEMSAndValidateToken(jwt);
  let current_track = await spotify.GetCurrentlyPlaying(identityId);
  console.log("Current Track: " + JSON.stringify(current_track, null, 2));

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

api.post('/user/stream/data', async (req) => {
  let {jwt} = req.body;
  let identityId = await cognito.GetPEMSAndValidateToken(jwt);

  return (await getstream.GetUserData(identityId));
});

api.post('/user/stream/post', async (req) => {
  let {
    jwt,
    verb,
    object,
    message,
    image,
    url
  } = req.body;
  let identityId = await cognito.GetPEMSAndValidateToken(jwt);
  console.log("/user/stream/post: " + verb + ", " + object + ", " + message + ", " + image);

  return (await getstream.Post(identityId, verb, object, message, image, url));
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

  // Only update it if we should...
  if (refresh_token) {
    await db.UpdateAttribute(identityId, "spotify", {refresh_token, id: profile.id});
  }

  return {profile};
});
