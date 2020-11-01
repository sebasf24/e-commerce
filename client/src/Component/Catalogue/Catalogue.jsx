import React,{useState} from 'react';
import style from './Catalogue.module.css'
import MenuCategories from '../menuCategories/MenuCategories.jsx'
import {useSelector} from 'react-redux';
import AllProducts from './AllProducts.jsx'

export default function Catalogue(props) {

const [verMenu, setVerMenu] = useState(true)

const productsl = useSelector(state=>state.products);

 let products = productsl.products;

 if (products!= undefined){
  let sinStock = products.filter(el => el.stock===0)
  let conStock= products.filter(el=> el.stock > 0)
    products = conStock.concat(sinStock)
}


    return (
        <div className={style.container}>
                <MenuCategories  />
            <div id="contenido">
                <AllProducts />
            </div>

        </div>
    )
}

