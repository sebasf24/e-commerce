import { ADD_USER, LIST_USERS, LOGIN_USER } from '../actions/user';


const initialState = {
    user: []
}
export default (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_USER:
            return {
                ...state,
                user: actions.user
            }
        case LIST_USERS:
            return {
                ...state,
                user: actions.user.data
            }
        case LOGIN_USER:
            return {
                ...state,
                user: actions.user.data
            }
        default:
            return state;
    }

}
