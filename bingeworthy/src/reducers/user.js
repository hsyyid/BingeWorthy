import {Auth} from 'aws-amplify';

export function user(state = {
    user: undefined,
    fetching: {}
}, action) {

    let {user} = store.getState();

    if (user.user) {
        return user.user;
    }

    Auth.currentAuthenticatedUser()
        .then(user => {
            store.dispatch("user/user", user);
        })
        .catch(err => console.error(err));
}
/*
  switch (action.type) {
    case 'user/fetching':
    {
      newState = Object.assign({}, state);
      let type = action.fetching;
      newState.fetching[type] = !state.fetching[type];
      return newState;
    }
    default: return state;
    }
}
*/
