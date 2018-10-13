import {Auth} from 'aws-amplify';

// const admin = require('firebase-admin');
// const serviceAccount = require('../firebaseAccountKey.json');
//
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });
//
// const db = admin.firestore();

import fetch from 'cross-fetch';

const endpoint = "https://fty0veyci2.execute-api.us-east-2.amazonaws.com/latest";

export function getUser() {
    return Auth.currentAuthenticatedUser();
}

// function getUserRef(username) {
//     return new Promise((resolve) => {
//         getUser().then(user => {
//             console.log(JSON.stringify(user, null, 2));
//
//             // Get the user ref
//             resolve(db.collection('users').doc(username));
//         });
//     });
// }
//
// export function setUserStatus(online) {
//     getUserRef().then(ref => {
//         ref.update({online});
//     });
// }
//
// /**
//  * Registers a listener for each friend to listen to
//  */
// export function listenToFriendsStatus() {
//     // TODO: Get friends
//     let friends = [];
//
//     friends.forEach(f => {
//         getUserRef(f.username).then(doc => {
//             doc.onSnapshot(docSnapshot => {
//                 console.log(`Received doc snapshot: ${docSnapshot}`);
//                 // TODO: Depending on what this snapshot is, update our 'onlineFriends' in state...
//             }, err => {
//                 console.log(`Encountered error: ${err}`);
//             });
//         });
//     });
// }

export function connectSpotify(code) {
    getUser().then(user => {
        console.log(JSON.stringify(user, null, 2));

        fetch(endpoint + "/auth", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jwt: user.signInUserSession.accessToken.jwtToken,
                code
            })
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(JSON.stringify(response, null, 2));
        });
    });
}

export function user(state = {
    onlineFriends: [],
    fetching: {}
}, action) {
    let newState;

    switch (action.type) {
        case 'user/fetching': {
            newState = Object.assign({}, state);
            let type = action.fetching;
            newState.fetching[type] = !state.fetching[type];
            return newState;
        }
        default:
            return state;
    }
}

