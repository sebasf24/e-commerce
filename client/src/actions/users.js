import axios from 'axios';

export const LIST_USERS='LIST_USERS';
export const DELETE_USER='DELETE_USER';
export const EDIT_USER= 'EDIT_USER';

export function listUser(){
    return function(dispatch){
        return axios.get('http://localhost:3000/user',
        {withCredentials: true})
        .then(user=>{
            dispatch({
                type: LIST_USERS,
                users:user
            })
        })
    }
}

export function editUser(user){
    return function(dispatch){
        return axios.put(`http://localhost:3000/user/${user.id}`, 
        user,
       { withCredentials: true})
        .then(us=>{
            console.log(us)
            dispatch({
    
                type: EDIT_USER,
                users:us
            })
        })
       
    }
}
export function deleteUser(id){
    return function(dispatch){
        return axios.delete(`http://localhost:3000/user/${id}`,
        {withCredentials: true})
        .then((user)=>{
            dispatch({
                type: DELETE_USER,
                users:user
            })
        })
    }
}