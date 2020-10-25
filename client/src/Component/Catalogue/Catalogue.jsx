import React,{useEffect} from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import style from './Catalogue.module.css'
import MenuCategories from '../menuCategories/MenuCategories.jsx'
import { useDispatch, useSelector, useStore } from 'react-redux';
import {mostrarProductos,mostrarProducto_category} from "../../actions/products.js"


export default function Catalogue() {
   var cat=window.location.href
const productsl = useSelector(state=>state.products);
const userlog=useSelector(state=>state.user)

 let products = productsl.products;

 if (products!= undefined){
  let sinStock = products.filter(el => el.stock===0)
  let conStock= products.filter(el=> el.stock > 0)
   products = conStock.concat(sinStock)
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
                { products.length !== 0 ? 
                products.map(product => {
                    return (<ProductCard userlog={userlog?userlog:""} Product={product} />)
                })
                :
                <h5>No hay publicaciones que coincidan con tu búsqueda.
                Revisá la ortografía de la palabra.
                Utilizá palabras más genéricas o menos palabras.</h5>
                }
            </div>
               
            
        </div>
    )
}

