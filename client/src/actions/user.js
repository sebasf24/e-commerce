import axios from 'axios';
import md5 from 'md5'

export const ADD_USER='ADD_USER';
export const LIST_USERS='LIST_USERS';
export const LOGIN_USER='LOGIN_USER';
export const DELETE_USER='DELETE_USER';
export const EDIT_USER= 'EDIT_USER';
export const ENVIAR_EMAIL = 'ENVIAR_EMAIL';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export function addUser(user){
   
    return function(dispatch){
        console.log(user)
        const newUser={
            name:user.name,
            lastname:user.lastname,
            dni:user.dni,
            email:user.email,
            username:user.username,
            password:user.password,
            image:user.image,
            typeUser:user.typeUser==='' ?  user.typeUser='cliente' : user.typeUser
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
export function loginUser(username, password){

    return function(dispatch){
        return axios.get(`http://localhost:3000/user/login?username=${username}&password=${password}`)
        .then(user=>{
            console.log(user)
            dispatch({
                type: LOGIN_USER,
                user:user
            })
        })
    }
}
export function editUser(user){
    // console.log(user)
    return function(dispatch){
        return axios.put(`http://localhost:3000/user/${user.id}`, user)
        .then(us=>{
            console.log(us)
            dispatch({
    
                type: EDIT_USER,
                user:us
            })
        })
       
    }
}
export function deleteUser(id){
    return function(dispatch){
        return axios.delete(`http://localhost:3000/user/${id}`)
        .then((user)=>{
            dispatch({
                type: DELETE_USER,
                user:user
            })
        })
    }
}

export function enviarEmail(email){
    return function(dispatch){
        return axios.post(`http://localhost:3000/user/0/passwordReset`,email)
        .then((user)=>{
            dispatch({
                type: ENVIAR_EMAIL,
                user:user
            })
        })
    }
}

export function resetPassword(password){
    return function(dispatch){
        return axios.post(`http://localhost:3000/user/${password.id}/passwordReset`,password)
        .then((user)=>{
            dispatch({
                type: RESET_PASSWORD,
                user:user
            })
        })
    }
}
