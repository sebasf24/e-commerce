import {LIST_ORDERS, ORDER_ID} from '../actions/order'

const initialState={
    order:[]
}

export default (state=initialState, actions)=>{
        switch (actions.type) {
            case LIST_ORDERS:
                return {
                    ...state,
                    order: actions.orders.data
                }
                case ORDER_ID:
                    return {
                        order: actions.orders.data
                    }
            
            default:
                return state;
        }
    
}

