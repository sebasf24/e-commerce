import React,{useEffect} from 'react';
import style from './Catalogue.module.css'
import MenuCategories from '../menuCategories/MenuCategories.jsx'
import { useDispatch, useSelector, useStore } from 'react-redux';
import {mostrarProducto_category} from "../../actions/products.js"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AllProducts from './AllProducts.jsx'
import ProductsCategory from './ProductsCategory.jsx'

export default function Catalogue(props) {

const productsl = useSelector(state=>state.products);
const userlog=useSelector(state=>state.user)

 let products = productsl.products;

 if (products!= undefined){
  let sinStock = products.filter(el => el.stock===0)
  let conStock= products.filter(el=> el.stock > 0)
   products = conStock.concat(sinStock)
}
const id = props.match.params.id;
console.log(id)
 const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(mostrarProducto_category(id))
    
},[])
    return (
        <div className={style.container}>
            <MenuCategories className={style.menuCategories}/>
            <Switch>
                <Route exact path="/products" component={AllProducts}/>
                <Route exact path="/products/category/:id" component={ProductsCategory}/>                    
            </Switch>

        </div>
    )
}

