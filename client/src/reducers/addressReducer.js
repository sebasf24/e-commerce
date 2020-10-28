import {ADDRESS_USER} from '../actions/address'

const initialState={
    address:[]
}
export default (state= initialState, action)=>{
    switch(action){
        case ADDRESS_USER:
            return{
                ...state,
                address: action.address
            }
        default:
            return state
    }

}