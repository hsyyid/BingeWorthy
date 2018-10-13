import store from '../store';

export function reducer(state = {
    user: undefined,
    fetching: {}
}, action) {
    let newState;

    switch (action.type) {
        case 'user/fetching':
        {
            newState = Object.assign({}, state);
            let type = action.fetching;
            newState.fetching[type] = !state.fetching[type];
            return newState;
        }
        default:
            return state;
    }
}
