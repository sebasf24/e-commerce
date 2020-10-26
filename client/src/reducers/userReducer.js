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
        console.log(actions)
        return {
            ...state,
           user: state.user.concat[(actions.user)]
        }

    case LOGIN_USER:
        return {
            
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
