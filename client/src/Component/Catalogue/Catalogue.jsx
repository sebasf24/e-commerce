import React,{useEffect} from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import style from './Catalogue.module.css'
import MenuCategories from '../menuCategories/MenuCategories.jsx'
import { useDispatch, useSelector, useStore } from 'react-redux';
import {mostrarProductos,mostrarProducto_category} from "../../actions/products.js"


export default function Cagalogue() {
   var cat=window.location.href
const productsl = useSelector(state=>state.products);
 let products = productsl.products;
 console.log(products);
 if(products === 'No hay publicaciones que coincidan con tu búsqueda.'){
     products = [];
 }
 const dispatch=useDispatch();
  useEffect(()=>{
    if(cat.split('/')[4] =='category'){
        dispatch(mostrarProducto_category(parseInt(cat.split('/')[5])))
        return
    }
        dispatch(mostrarProductos())
},[])
    return (
        <div className={style.container}>

            <MenuCategories className={style.menuCategories}/>
            <div className={style.productos}>
                { products ? 
                products.map(product => {
                    return (<ProductCard Product={product} />)
                })
                :
                <h1>No hay publicaciones que coincidan con tu búsqueda.</h1>
                }
            </div>
               
            
        </div>
    )
}

