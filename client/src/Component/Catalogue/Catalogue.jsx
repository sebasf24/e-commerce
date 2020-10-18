import React,{useEffect} from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import style from './Catalogue.module.css'
import MenuCategories from '../menuCategories/MenuCategories.jsx'
import { useDispatch, useSelector, useStore } from 'react-redux';
import {mostrarProductos,mostrarProducto_category} from "../../actions/products.js"


export default function Catalogue() {
   var cat=window.location.href
const productsl = useSelector(state=>state.products);
console.log(products1)
 let products = productsl.products;
 let sinStock = products.filter(el => el.stock===0)
 let conStock= products.filter(el=> el.stock > 0)
 let productos = conStock.concat(sinStock)
 if(productos === 'No hay publicaciones que coincidan con tu búsqueda.'){
     productos = [];
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
                { productos ? 
                productos.map(product => {
                    return (<ProductCard Product={product} />)
                })
                :
                <h1>No hay publicaciones que coincidan con tu búsqueda.</h1>
                }
            </div>
               
            
        </div>
    )
}

