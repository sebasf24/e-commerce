import axios from 'axios'
export const ADDRESS_USER='ADDRESS_USER';

export function addressUser(idUser, address){
    return function(dispatch){
        return axios.post(`http://localhost:3000/user/${idUser}/address`, address,
        {withCredentials:true})
        .then((add)=>{
            dispatch({
                type:ADDRESS_USER,
                address:add
            })

        })
    }
}