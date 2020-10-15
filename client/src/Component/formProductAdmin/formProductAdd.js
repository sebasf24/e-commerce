import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { mostrarProductos, agregarProducto } from "../../actions/products.js";
import style from '../Catalogue/Catalogue.module.css';
import ProductCard from '../ProductCard/ProductCard';

const FormProductAdd = () => {
    const productS1 = useSelector(state => state.products);
    console.log(productS1);
    const [productS, setProductS] = useState();
    //setProductS(productS1.products);
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
        dispatch(agregarProducto(product))
        //Cuarto: Reiniciar el form
        console.log(productS);
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
        <Container id='container' className='container-fluid col-6 mt-4 bg-white p-3'>
            <Form id='formProduct' name="add" onSubmit={envioformulario}>

                <Form.Label id='formTitle'>Agregar Producto</Form.Label><br/>

                <Form.Label>Nombre</Form.Label>
                <Form.Control column="sm" size="sm" type='text' placeholder='Nombre'
                    name='name'
                    onChange={obtenerInfo}
                    value={name}
                    required
                /><p id="pName"></p>
                

                <Form.Label>Descripción</Form.Label>
                <Form.Control type='text' placeholder='Descripción'
                    name='description'
                    onChange={obtenerInfo}
                    value={description}
                    required
                /><p id="pDescripcion"></p>
                

                <Form.Label>Precio</Form.Label>
                <Form.Control type='number' placeholder='Precio'
                    name='price'
                    onChange={obtenerInfo}
                    value={price}
                    required
                /> <p id='pPrice'></p>
                

                <Form.Label >Stock</Form.Label>
                <Form.Control type='number' placeholder='Stock'
                    name='stock'
                    onChange={obtenerInfo}
                    value={stock}
                    required
                /><p id="pStock"></p>
                

                <Form.Label>Imagen</Form.Label>
                <Form.Control type='file' placeholder='Imagen'
                    name='img'
                    onChange={encodeImageFileAsURL}
                    //value={img}
                    required
                /><p id="pImg"></p>
                 <img src={product.img} width="70%"/> 
                

                <Form.Group controlId="formBasic">
                    <Button type="submit" variant="primary">Agregar</Button>
                </Form.Group>

                <Form.Label>Productos</Form.Label>
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

