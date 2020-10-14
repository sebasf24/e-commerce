import axios from 'axios';

export const ADD_CATEGORY= 'ADD_CATEGORY';
export const LIST_CATEGORY= 'LIST_CATEGORY';

export function addCategory(cat){
    return function(dispatch){
        const newCategory={
            name: cat.name,
            description:cat.description
        };
        return axios.post('http://localhost:3000/category',newCategory)
        .then((category)=>{
            dispatch({
                type:ADD_CATEGORY,
                category:category
            })

        })

    }
}
export function listCategory(){
    return function(dispatch){
        return axios.get('http://localhost:3000/category')
        .then(json=>{
            dispatch({
                type:LIST_CATEGORY,
                category:json
            })
        })
    }
}