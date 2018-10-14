const fetch = require("node-fetch");
const delay = require('delay');
const db = require("./db.js");

const {urlEncode, compareArrays, splitArray} = require("../util.js");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

/**
* Authorizes the user
*/
const AuthUser = async (code) => {
  let url = 'https://accounts.spotify.com/api/token';

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Basic ' + new Buffer(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: urlEncode({code, grant_type: "authorization_code", redirect_uri})
  });

  return await response.json();
};

/**
* Gets a new access token to make requests
*/
const RefreshToken = async (identityId) => {
  if (identityId) {
    let user = await db.GetUser(identityId);
    let refreshToken = user.spotify.refresh_token;

    let response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + new Buffer(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlEncode({refresh_token: refreshToken, grant_type: "refresh_token"})
    });

    let json = await response.json();

    return json.access_token;
  } else {
    return undefined;
  }
};

/**
* Util function to request a paginated response into a full list
* TODO: Move to separate util file, fix the 429 error
*/
const GetList = async (base_url, params, key) => {
  let list = [];
  let next = base_url;

  do {
    try {
      let response = await fetch(next, params);

      if (response.status === 200) {
        let data = await response.json();

        // If the data we want is inside some other object key, use that instead.
        if (key)
          data = data[key];

        if (data && data.items && data.items.length > 0) {
          list.push.apply(list, data.items);
          next = data.next;
          console.log(list.length + " / " + data.total);
        }
      } else if (response.status === 429 && response.headers.has("retry-after")) {
        let retryDelay = parseInt(response.headers.get("retry-after"));
        console.log(`Retrying after ${retryDelay} seconds...`);
        // Delay is returned in seconds, we need it in millisec
        await delay(retryDelay * 1000);
      } else {
        console.log("Status: " + response.status);
        console.log((await response.text()))
        break;
      }
    } catch (err) {
      console.log("Error!!!");
      console.error(err);

      if (err && err.message) {
        console.log("Error message: " + err.message);
      }
    }
  } while (next);

  return list;
};

/**
* Gets users recently played tracks
*/
const GetRecentTracks = async (identityId) => {
  let accessToken = await RefreshToken(identityId);

  let response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  return await response.json();
};

/**
* Gets users top tracks
*/
const GetTop = async (identityId, type, time_range) => {
  let accessToken = await RefreshToken(identityId);

  let topTracks = await GetList(`https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  return topTracks;
};

/**
* Gets users playlists
*/
const GetPlaylists = async (identityId) => {
  let accessToken = await RefreshToken(identityId);

  let {id} = await GetUserProfile(accessToken);
  let playlists = await GetList("https://api.spotify.com/v1/me/playlists?limit=50", {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  return playlists.filter(p => p.owner.id === id);
};

/**
* Gets the artists top songs
*/
const GetTopSongs = async (accessToken, artistId) => {
  let response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  let data = await response.json();
  return data.tracks;
};

/**
* Gets current users profile
*/
const GetUserProfile = async (accessToken) => {
  let response = await fetch(`https://api.spotify.com/v1/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  return await response.json();
}

/**
* Returns the artists the user is following
*/
const GetFollowingArtists = async (identityId) => {
  let accessToken = await RefreshToken(identityId);
  let artists = await GetList(`https://api.spotify.com/v1/me/following?type=artist`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  }, 'artists');

  return artists;
};

/**
* Returns albums released by artists the user is following in the last two weeks
*/
const GetNewAlbums = async (identityId) => {
  let artists = await GetFollowingArtists(identityId);
  console.log(`[GetNewAlbums]: Got ${artists.length} following artists.`);

  let accessToken = await RefreshToken(identityId);
  let albums = [];
  let time = new Date().getTime();

  for (let i = 0; i < artists.length; i++) {
    let artist = artists[i];
    albums = albums.concat((await GetAlbums(accessToken, artist.id)).filter(a => {
      let released = new Date(a.release_date);
      let timeDiff = Math.abs(time - released.getTime());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      return diffDays < 14;
    }));

    console.log(`[GetNewAlbums]: ${albums.length} new albums...`);
  }

  return albums;
};

/**
* Gets users currently playing track, if available.
*/
const GetCurrentlyPlaying = async (identityId) => {
  let accessToken = await RefreshToken(identityId);
  console.log("Access Token: " + accessToken);

  let response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  if (response !== 204) {
    let data = await response.json();
    console.log("Data: " + JSON.stringify(data, null, 2))

    if (data.currently_playing_type === "track") {
      let duration = await GetTrackLength(accessToken, data.item.id);

      return {
        artists: data.item.artists.map(a => a.name),
        album: {
          name: data.item.album.name,
          images: data.item.album.images
        },
        song: {
          id: data.item.id,
          name: data.item.name,
          duration,
          progress: data.progress_ms
        }
      };
    }
  }

  return undefined;
};

const GetTrackLength = async (accessToken, trackId) => {
  let response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  let data = await response.json();
  return data.duration_ms;
}

module.exports = {
  AuthUser,
  RefreshToken,
  GetRecentTracks,
  GetCurrentlyPlaying,
  GetTop,
  GetPlaylists,
  GetUserProfile,
  GetTopSongs
};
