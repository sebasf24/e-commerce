import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { mostrarProductos, agregarProducto } from "../../actions/products.js";
import { Link } from 'react-router-dom'

const FormProductAdd = () => {
    //const dispatch=useDispatch()
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

            setProduct({
                ...product,
                img: base64
            })

        }
    }

    const envioformulario = (e) => {
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado con exito',
        })
        e.preventDefault();
        dispatch(agregarProducto(product))
        //Cuarto: Reiniciar el form
        //console.log(productS);
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
        return () => {

        }
    }, [])

    return (
        <Container id='container' className='container-fluid col-6 mt-4 bg-white p-3'>
            <Link to={`/administrar`}><Button className='mr-3' variant="primary" type="button" >Volver atras</Button></Link>
            <Form id='formProduct' name="add" onSubmit={envioformulario} >

                <Form.Label id='formTitle'>Agregar Producto</Form.Label><br />

                <Form.Label>Name</Form.Label>
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


                <Form.Label>Price</Form.Label>
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


                <Form.Label>Image</Form.Label>
                <Form.Control type='file' placeholder='Imagen'
                    name='img'
                    onChange={encodeImageFileAsURL}
                    //value={img}
                    required
                /><p id="pImg"></p>
                <img src={product.img} width="70%" />


                <Form.Group controlId="formBasic">

                    <Button type="submit" variant="primary">Agregar</Button>

                </Form.Group>

            </Form>
        </Container>
    )
}

export default FormProductAdd;

