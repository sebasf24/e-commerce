import {
    LIST_USERS, 
    EDIT_USER, 
    DELETE_USER
} from '../actions/users';


const initialState = {
users: []
}
export default (state = initialState, actions) => {
switch (actions.type) {
   
    case LIST_USERS:
        return {
            // ...state,
            users: actions.users.data
        }
    case EDIT_USER:
        return{
            ...state,
            users:actions.users
        }
    
    case DELETE_USER:
        return{
            users: state.users.filter( us=> us.id !== actions.users.data.id)
        }
    default:
        return state;
}

}
