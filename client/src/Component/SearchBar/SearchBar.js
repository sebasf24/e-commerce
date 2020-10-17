import React, { useState } from 'react';
import styles from './searchbar.module.css';
import { ImSearch } from "react-icons/im";
import {Button} from 'react-bootstrap';
import { mostrarBusqueda, mostrarProductos } from '../../actions/products';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SerchBar = () => {
    const [serch, setSerch] = useState("");

    var productos = useSelector(state => state.products);

    const dispatch = useDispatch();

    const handlerSerch = (e) => {
        setSerch(e.target.value);
        let value = e.target.value;
        if (value !== '') {
            dispatch(mostrarBusqueda(e.target.value));
        }else {
        dispatch(mostrarProductos());
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <form className={styles.form} onSubmit={handlerSubmit}>
                <Link to={'/search'} style={{display:'flex'}}><Button type="submit" className={styles.boton} variant="light" ><ImSearch/></Button>
                <input className={styles.buscador} type="text" placeholder="BUSCAR"
                onChange={handlerSerch} /></Link>
            </form>
        </div>
    )
}

export default SerchBar;