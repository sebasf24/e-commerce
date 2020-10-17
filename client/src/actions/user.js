import axios from 'axios';
import md5 from 'md5'

export const ADD_USER='ADD_USER';
export const LIST_USERS='LIST_USERS';
export const LOGIN_USER='LOGIN_USER';

export function addUser(user){
    return function(dispatch){
        const newUser={
            name:user.name,
            lastname:user.lastname,
            dni:user.dni,
            email:user.email,
            username:user.username,
            password:md5(user.password),
            image:user.image,
            typeUser:user.typeUser    
        };
        return axios.post('http://localhost:3000/user', newUser)
        .then(us=>{
            dispatch({
                type: ADD_USER,
                user:us
            })
        })
       
    }
}
export function listUser(){
    return function(dispatch){
        return axios.get('http://localhost:3000/user')
        .then(user=>{
            dispatch({
                type: LIST_USERS,
                user:user
            })
        })
    }
}


