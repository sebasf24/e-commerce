import { ADD_USER, LIST_USERS, LOGIN_USER, EDIT_USER, DELETE_USER, ENVIAR_EMAIL, RESET_PASSWORD } from '../actions/user';


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
                // ...state,
                user: actions.user.data
            }
        case LOGIN_USER:
            return {
                ...state,
                user: actions.user.data
            }
        case EDIT_USER:
            return{
                ...state,
                user:actions.user
            }
        
        case DELETE_USER:
            return{
                user: state.user.filter( us=> us.id !== actions.user.data.id)
            }

        case ENVIAR_EMAIL:
                return{
                    user:actions.user
            }

        case RESET_PASSWORD:
             return{
                user:actions.user
            }

        default:
            return state;
    }

}
