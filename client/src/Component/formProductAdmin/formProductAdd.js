import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { mostrarProductos } from "../../actions/products.js";
import style from '../Catalogue/Catalogue.module.css'
import ProductCard from '../ProductCard/ProductCard'
import axios from 'axios';

const FormProductAdd = () => {
    const productS1 = useSelector(state => state.products);
    const [productS, setProductS] = useState()
    const [product, setProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        img: ''
    })

    // extrae los valores
    const { name, description, price, stock, img } = product;


    //leer datos del formulario
    const obtenerInfo = e => {
        console.log('producto imagen', product.img);

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })

    }

    function encodeImageFileAsURL(e) {
        var input = e.target;
        var fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function (event) {
            //console.log(event);
            var base64 = event.target.result;
            let buff = new Buffer(base64, 'base64');

            setProduct({
                ...product,
                img: base64
            })

        }
    }

    const envioformulario = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/products', product, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //Cuarto: Reiniciar el form
        setProduct({
            id: '',
            name: '',
            description: '',
            price: '',
            stock: '',
            img: ''
        });
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(mostrarProductos())
        setProductS(
            productS1.products
        )
        
        return ()=> {
            
        }
    }, [])

    return (
        <Container id='container'>
            <Form id='formProduct' name="add" onSubmit={envioformulario}>

                <Form.Label id='formTitle'>Add Product</Form.Label><br/>

                <Form.Label>Name</Form.Label>
                <Form.Control column="sm" size="sm" type='text' placeholder='name'
                    name='name'
                    onChange={obtenerInfo}
                    value={name}
                    required
                /><p id="pName"></p>
                <br /><br />

                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='description'
                    name='description'
                    onChange={obtenerInfo}
                    value={description}
                    required
                /><p id="pDescripcion"></p>
                <br /><br />

                <Form.Label>Price</Form.Label>
                <Form.Control type='number' placeholder='price'
                    name='price'
                    onChange={obtenerInfo}
                    value={price}
                    required
                /> <p id='pPrice'></p>
                <br /><br />

                <Form.Label >Stock</Form.Label>
                <Form.Control type='number' placeholder='stock'
                    name='stock'
                    onChange={obtenerInfo}
                    value={stock}
                    required
                /><p id="pStock"></p>
                <br /><br />

                <Form.Label>Img</Form.Label>
                <Form.Control type='file' placeholder='img'
                    name='img'
                    onChange={encodeImageFileAsURL}
                    //value={img}
                    required
                /><p id="pImg"></p>
                 <img src={product.img} width="70%"/> 
                <br /><br />

                <Form.Group controlId="formBasic">
                    <Button type="submit" variant="primary">Add</Button>
                </Form.Group>

                <Form.Label>Products</Form.Label>
                <div style={{borderTop: '1px solid black'}} className={style.productos} id="producto">
                    {
                        productS1.products ? 
                        productS1.products.map(product => {
                            return (<ProductCard Product={product} />)
                        })
                        :
                        <div></div> 
                    }
                </div>
            </Form>
        </Container>
    )
}

export default FormProductAdd;

