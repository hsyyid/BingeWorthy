import fetch from 'cross-fetch';

const stream = require('getstream');
const client = stream.connect('4tbmqcbpsgqm', null, '43169');
const endpoint = "https://fty0veyci2.execute-api.us-east-2.amazonaws.com/latest";

import {getUser} from './user';

export function getUserData() {
    return new Promise((resolve) => {
        getUser().then(user => {
            fetch(endpoint + "/user/stream/data", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jwt: user.signInUserSession.accessToken.jwtToken
                })
            }).then((response) => {
                console.log(response.status);
                return response.json();
            }).then((response) => {
                resolve(response);
            });
        });
    });
}

export function follow(other) {
    return new Promise((resolve) => {
        getUser().then(user => {
            fetch(endpoint + "/user/stream/follow", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jwt: user.signInUserSession.accessToken.jwtToken,
                    other
                })
            }).then((response) => {
                console.log(response.status);
                return response.json();
            }).then((response) => {
                resolve(response);
            });
        });
    });
}

export function isFollowing(other) {
    return new Promise((resolve) => {
        getUser().then(user => {
            fetch(endpoint + "/user/stream/isfollowing", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jwt: user.signInUserSession.accessToken.jwtToken,
                    other
                })
            }).then((response) => {
                console.log(response.status);
                return response.json();
            }).then((response) => {
                resolve(response);
            });
        });
    });
}

export function post(verb, object, message, image, url) {
    return new Promise((resolve) => {
        getUser().then(user => {
            fetch(endpoint + "/user/stream/post", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jwt: user.signInUserSession.accessToken.jwtToken,
                    verb,
                    object,
                    message,
                    image,
                    url
                })
            }).then((response) => {
                console.log(response.status);
                return response.json();
            }).then((response) => {
                resolve(response);
            });
        });
    });
}

export function getUserSession() {
    return new Promise((resolve) => {
        getUser().then(user => {
            fetch(endpoint + "/user/stream/tokens/session", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jwt: user.signInUserSession.accessToken.jwtToken
                })
            }).then((response) => {
                console.log(response.status);
                return response.json();
            }).then((response) => {
                resolve(response);
            });
        });
    });
}

function getReadToken() {
    return new Promise((resolve) => {
        getUser().then(user => {
            fetch(endpoint + "/user/stream/tokens/read-only", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jwt: user.signInUserSession.accessToken.jwtToken
                })
            }).then((response) => {
                return response.json();
            }).then((response) => {
                resolve({
                    identityId: user.signInUserSession.accessToken.payload.sub,
                    token: response.token
                });
            });
        });
    });
}

/**
 * Listens for updates in their timeline/feed
 */
export function subscribeNotifications() {
    getReadToken().then(auth => {
        let {identityId, token} = auth;
        let feed = client.feed('timeline', identityId, token);

        feed.subscribe((data) => {
            console.log("New Data: " + JSON.stringify(data, null, 2));
        }).then(() => {
            console.log('now listening to changes in realtime');
        }, (err) => {
            console.error('something went wrong, check the console logs', err);
        });
    });
}

export function reducer(state = {
    fetching: {}
}, action) {
    let newState;

    switch (action.type) {
        case 'stream/fetching': {
            newState = Object.assign({}, state);
            let type = action.fetching;
            newState.fetching[type] = !state.fetching[type];
            return newState;
        }
        default:
            return state;
    }
}
