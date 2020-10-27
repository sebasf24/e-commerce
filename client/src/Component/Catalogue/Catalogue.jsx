import React from 'react';
import style from './Catalogue.module.css'
import MenuCategories from '../menuCategories/MenuCategories.jsx'
import {useSelector} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AllProducts from './AllProducts.jsx'

export default function Catalogue(props) {

const productsl = useSelector(state=>state.products);
const userlog=useSelector(state=>state.user)

 let products = productsl.products;

 if (products!= undefined){
  let sinStock = products.filter(el => el.stock===0)
  let conStock= products.filter(el=> el.stock > 0)
   products = conStock.concat(sinStock)
}
    return (
        <div className={style.container}>
            <MenuCategories className={style.menuCategories}/>
            <Switch>
                <Route component={AllProducts}/>                 
            </Switch>

        </div>
    )
}

