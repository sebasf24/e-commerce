import {ADD_CATEGORY, LIST_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY} from '../actions/category';

const initialState={
  category:[]
}

export default (state=initialState, actions)=>{
    switch(actions.type){
        case ADD_CATEGORY:
            return  {
                ...state,
                category: actions.category
            }
        case DELETE_CATEGORY:
            return{
                category: state.category.filter( cat=> cat.id !== actions.category.id)
            }
        case EDIT_CATEGORY:
            return{
                ...state,
                category:actions.category.data
            }
        case LIST_CATEGORY:
            return{
                ...state,
                category: actions.category.data
            }
        default:
            return state;
    }

}