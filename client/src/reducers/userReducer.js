import { ADD_USER,
    LOGIN_USER, 
    LOGOUT_USER,
    USER_PROFILE
} from '../actions/user';


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

    case LOGIN_USER:
        return {
            ...state,
            user: actions.user
           
        }
    case LOGOUT_USER:
            return state;

    case USER_PROFILE:

        return{
            user: actions.user
        }
    default:
        return state;
}

}
