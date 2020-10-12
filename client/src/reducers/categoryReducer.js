import {ADD_CATEGORY, LIST_CATEGORY} from '../actions/category';

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
        case LIST_CATEGORY:
            return{
                ...state,
                category: actions.category.data
            }
        default:
            return state;
    }

}