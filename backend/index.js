// Load sensitive variables from .env
require('dotenv').config();

const ApiBuilder = require('claudia-api-builder'),
  fetch = require("node-fetch"),
  spotify = require("./src/api/spotify.js"),
  cognito = require("./src/api/cognito.js"),
  db = require("./src/api/db.js"),
  api = new ApiBuilder();

module.exports = api;

/**
* returns an access token for Spotify. Used to initialize the player
*/
api.get('/access-token', async (req) => {
  let {identityId} = req.proxyRequest.queryStringParameters;
  return await spotify.RefreshToken(identityId);
});

/**
* Used to authorize a user that logs in via Spotify
* and adds the user to DynamoDB if not already existing
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
    let user = await db.GetUser(cognitoIdentity.IdentityId);

    // If the user doesn't exist yet, create him
    if (!user) {
      await db.AddUser({identityId: cognitoIdentity.IdentityId, refresh_token, spotifyId: profile.id});
      let res = await ecs.GetLibrary(cognitoIdentity.IdentityId);

      console.log(`[/auth?identityId=${cognitoIdentity.IdentityId}]: ECS Task ${JSON.stringify(res, null, 2)}`);
    }
  }

  return {profile, cognitoIdentity};
});
