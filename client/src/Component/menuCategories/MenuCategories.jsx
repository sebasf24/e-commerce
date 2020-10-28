import React, {useEffect, useState} from 'react';
import styles from './menuCategories.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux';
import {mostrarProducto_category,mostrarProductos} from '../../actions/products.js';
import {listCategory} from '../../actions/category.js';

export default function MenuCategories() {
    const dispatch=useDispatch();
    const prod=useSelector(store=>store.products);
    const categ=useSelector(store=>store.category);
    const categories=categ.category;
    useEffect(()=>{
         dispatch(listCategory())
     },[]);
   
    return (
            <Nav  className={`flex-column ${styles.main_menu}`}>
                <Nav.Link className={styles.text + ' ' + styles.centrar }
                eventKey="disabled" 
                disabled>CATEGORIAS</Nav.Link>
                <hr class="clearfix w-100"/>
                    <Link onClick={()=>{dispatch(mostrarProductos())}} className={`text-decoration-none ${styles.text}`} to='/products'
                    className={styles.text}>Todos</Link>
                {   
                    categories 
                    ?
                    categories.map(cat=>{
                        return(
                          
                            <Link  to={`/products/category/${cat.id}`}
                                    onClick={()=>{dispatch(mostrarProducto_category(cat.id))}}
                                    className={`text-decoration-none ${styles.text}`}>
                                {cat.name}
                            </Link>   
                        )
                    })
                    :
                    <div></div>
                }
               
            </Nav>
        

 

    )

}

