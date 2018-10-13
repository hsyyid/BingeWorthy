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

/**
* Creates and adds a post to the user's posts
*/
const Post = async (identityId, verb, object, text) => {
  let token = await CreateUserSessionToken(identityId);
  let session = await client.createUserSession(token);

  let defUser = {
    name: 'Batman',
    url: 'batsignal.com',
    desc: 'Smart, violent and brutally tough solutions to crime.',
    profileImage: 'https://i.kinja-img.com/gawker-media/image/upload/s--PUQWGzrn--/c_scale,f_auto,fl_progressive,q_80,w_800/yktaqmkm7ninzswgkirs.jpg',
    coverImage: 'https://i0.wp.com/photos.smugmug.com/Portfolio/Full/i-mwrhZK2/0/ea7f1268/X2/GothamCity-X2.jpg?resize=1280%2C743&ssl=1'
  };
  await session.user.getOrCreate(defUser);

  let activity = {
    actor: session.user,
    verb,
    object,
    text
  };

  let response = await session.feed('user').addActivity(activity);
  return response;
}

/**
* Add/remove the other user's posts from your timeline (aka your feed)
*/
const FollowUser = async (identityId, other) => {
  let userTimeline = client.feed('timeline', identityId);
  let otherFeed = client.feed('user', other);
  let following = await IsFollowingUser(identityId, other);

  if (!following) {
    return (await userTimeline.follow(otherFeed));
  } else {
    return (await userTimeline.unfollow(otherFeed));
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
  IsFollowingUser
};
