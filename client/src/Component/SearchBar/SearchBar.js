import React, { useState, useEffect, useRef } from 'react';
import styles from './searchbar.module.css';
import axios from 'axios';
import { ImSearch } from "react-icons/im";
import {Button} from 'react-bootstrap';

const SerchBar = () => {
    const [serch, setSerch] = useState("");
    const [product, setProduct] = useState([]);

    const myRef = useRef(null);

    const handlerSerch = () => {
        let valor = myRef.current.value;
        let valorMinus = valor.toLowerCase();
        let logitud = valor.length;

        var hijo = '';
        api.forEach(producto => {
            let name = producto.name.substr(0, logitud).toLocaleLowerCase();
            if (name === valorMinus && valorMinus !== '') {
               setProduct([
                   ...product,
                   producto
               ])
               hijo = hijo + `<h1>${producto.name}</h1>`
            }
        })
    }

    useEffect(() => {
        axios.get('/products')
          .then(res => {
              setProduct(res);
          })
          .catch(err => {
              console.log(err);
          })
    });

    const handlerSubmit = (e) => {
        e.preventDefault();
        let valor = myRef.current.value;
        console.log(valor);
    }

    return (
        <div>
            <form className={styles.form} onSubmit={handlerSubmit}>
                <Button className={styles.boton} variant="light"><ImSearch/></Button>
                <input className={styles.buscador} type="text" ref={myRef} placeholder="BUSCAR"
                onChange={handlerSerch} />
            </form>
        </div>
    )
}


const api = [
    {
        name: 'Televisor',
        description: 'LCC 43 pulgadas',
        price: '22000',
        stock: '10',
        img: 'https://i.blogs.es/ef9b2c/tv-signature-oled-z9-05-the-largest-oled-desktop/1366_2000.jpg'
    }, {
        name: 'Teclado',
        description: 'Super teclado',
        price: '15000',
        stock: '12',
        img: 'https://images-na.ssl-images-amazon.com/images/I/41FhVRJZnzL._AC_SX466_.jpg'
    }, {
        name: 'Mouse',
        description: 'Mouse inalambrico',
        price: '14000',
        stock: '15',
        img: 'https://s1.eestatic.com/2020/01/30/omicrono/Omicrono_463715545_143879861_1024x576.jpg'
    }, {
        name: 'Micro Procesador',
        description: 'Micro Procesador i9',
        price: '30000',
        stock: '23',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS3siIgBuUe2-qFq7PPs0_DHnEn3t58P4PHIg&usqp=CAU'
    }, {
        name: 'Pendrive',
        description: 'Almacenaminto 64GB',
        price: '6000',
        stock: '23',
        img: 'https://lh3.googleusercontent.com/proxy/L6gCPz82fcxIO2Ier0zDJAqiRfPB-KV6FC0Q0s6Wr-BwA1cHpKCCY7j4C6bjXSEc8wKG145QNRywbOaTSE4Zi1k6qJkVvBIekaLKhCYw8nEtUKwXTEK9GZuTarOSroIo3ux-ikHpnSP2'
    }
]

export default SerchBar;