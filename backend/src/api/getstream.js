const getstream = require("getstream");
const client = getstream.connect('***REMOVED***', '***REMOVED***', '***REMOVED***');

/**
* Used to subscribe users clients to real time updates on their timeline/feed
*/
const GetReadOnlyToken = async (identityId) => {
  return (await client.feed('timeline', identityId).getReadOnlyToken());
}

/**
* Seems to be required:
* // user sessions are commonly used client-side (eg. web / react native)
* // the userToken variable is created server-side (often as part of part of the sign-up / sign-in flow)
*/
const CreateUserSessionToken = async (identityId) => {
  return (await client.createUserSessionToken(identityId));
}

const GetUserData = async (identityId) => {
  let token = await CreateUserSessionToken(identityId);
  let session = await client.createUserSession(token);
  let {data} = await session.user.get();
  return data;
};

const UpdateUser = async (identityId, params) => {
  let token = await CreateUserSessionToken(identityId);
  let session = await client.createUserSession(token);

  // let defUser = {
  //   name: '...',
  //   url: '...',
  //   desc: '...',
  //   profileImage: 'https://pbs.twimg.com/profile_images/683068621195767812/Uz_ewTv6_400x400.png',
  //   coverImage: 'https://i0.wp.com/photos.smugmug.com/Portfolio/Full/i-mwrhZK2/0/ea7f1268/X2/GothamCity-X2.jpg?resize=1280%2C743&ssl=1'
  // };

  return await session.user.update(params);
}

/**
* Creates and adds a post to the user's posts
*/
const Post = async (identityId, verb, object, text, image) => {
  let token = await CreateUserSessionToken(identityId);
  let session = await client.createUserSession(token);

  let activity = {
    actor: session.user,
    verb,
    object,
    text,
    image
  };

  // If we are not following ourselves, do so.
  let isFollowing = await IsFollowingUser(identityId, identityId);

  if (!isFollowing) {
    await FollowUser(identityId, identityId);
  }

  // Add the activity to the stream
  let response = await session.feed('user').addActivity(activity);
  return response;
}

/**
* Add/remove the other user's posts from your timeline (aka your feed)
*/
const FollowUser = async (identityId, other) => {
  let userTimeline = client.feed('timeline', identityId);
  let following = await IsFollowingUser(identityId, other);

  if (!following) {
    return (await userTimeline.follow("user", other));
  } else {
    return (await userTimeline.unfollow("user", other));
  }
}

/**
* Checks if this user follows the other user
*/
const IsFollowingUser = async (identityId, other) => {
  let userTimeline = client.feed('timeline', identityId);
  let response = await userTimeline.following({
    offset: 0,
    limit: 1,
    filter: [`user:${other}`]
  });

  if (response) {
    let {results} = response;
    return results && results.length > 0;
  }

  return false;
}

module.exports = {
  GetReadOnlyToken,
  CreateUserSessionToken,
  Post,
  FollowUser,
  IsFollowingUser,
  UpdateUser,
  GetUserData
};
