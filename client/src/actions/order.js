import axios from 'axios';

export const LIST_ORDERS='LIST_ORDERS';
export const ORDER_ID='ORDER_ID'

export default function listOrders(){
    return function(dispatch){
        return axios.get('http://localhost:3000/orders')

        .then(json=>{
            dispatch({
                type:LIST_ORDERS,
                orders:json
            })
        })
        .catch(err=>{console.log(err)})

    }
    
};

export  function findbyId(id){
    return function(dispatch){
        return axios.get(`http://localhost:3000/orders/${id}`,{
            withCredentials: true,
        })

        .then(json=>{
            dispatch({
                type:ORDER_ID,
                orders:json
            })
        })
        .catch(err=>{console.log(err)})

    }
    
}