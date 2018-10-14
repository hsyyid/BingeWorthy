import {Auth} from 'aws-amplify';
import fetch from 'cross-fetch';

const endpoint = "https://fty0veyci2.execute-api.us-east-2.amazonaws.com/latest";

export function getUser() {
    return Auth.currentAuthenticatedUser();
}

export function logOut() {
   return Auth.signOut();
}

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

