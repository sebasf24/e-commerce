import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { mostrarProducto_id, editarProducto } from "../../actions/products.js";

const FormProductEdit = () => {
    const [product, setProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        img: ''
    })

    // extrae los valores
    const { id, name, description, price, stock, img } = product;

    const productS1 = useSelector(state => state.products);
    //console.log(productS1);
    let base64ToString;
    (productS1.selectedProduct.img) && (base64ToString = Buffer.from(productS1.selectedProduct.img.data, "base64").toString())
    
    

    const dispatch = useDispatch();

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

    return (
        <Container id='container' className='container-fluid col-6 mt-4 bg-white p-3'>
            <Form id='formProduct' name="editar" onSubmit={envioformulario}>

                <Form.Label id='formTitle'>Editar Producto</Form.Label>

                <div>
                    <input id="input" type="number" placeholder="Insert id"
                        name='id'
                        onChange={obtenerInfo}
                        value={id}
                        required
                    />
                    <Button id='btnGet' className='ml-1 mt-3' variant="primary" type="button" onClick={() => dispatch(mostrarProducto_id(product.id))}>Obtener Producto</Button>
                    <p id="pId"></p>
                </div>

                {/* <Form.Group controlId="formBasic">
                    <Button variant="primary" type="button">Traer Productos</Button>
                </Form.Group> */}

                <Form.Label>Nombre</Form.Label>
                <Form.Control column="sm" size="sm" type='text' placeholder='nombre'
                    name='name'
                    onChange={obtenerInfo}
                    value={name}
                    required
                /><p id="pName" className='pt-3'>{productS1.selectedProduct.name}</p>
                

                <Form.Label>Descripción</Form.Label>
                <Form.Control type='text' placeholder='descripción'
                    name='description'
                    onChange={obtenerInfo}
                    value={description}
                    required
                /><p id="pDescripcion" className='pt-3'>{productS1.selectedProduct.description}</p>
               

                <Form.Label>Precio</Form.Label>
                <Form.Control type='number' placeholder='precio'
                    name='price'
                    onChange={obtenerInfo}
                    value={price}
                    required
                /> <p id='pPrice' className='pt-3'>{productS1.selectedProduct.price}</p>
                

                <Form.Label >Stock</Form.Label>
                <Form.Control type='number' placeholder='stock'
                    name='stock'
                    onChange={obtenerInfo}
                    value={stock}
                    required
                /><p id="pStock" className='pt-3'>{productS1.selectedProduct.stock}</p>
               

                <Form.Label>Imagen</Form.Label>
                <Form.Control type='file' placeholder='imagen'
                    name='img'
                    onChange={encodeImageFileAsURL}
                    //value={img}
                    required
                /><p id="pImg" className='pt-3'></p>
                <img src={base64ToString} width="300px" />
                
               
                <Button type="submit" className='mt-3' onClick={() => dispatch(editarProducto(product))} variant="primary">Enviar</Button>

            </Form>
        </Container>
    )
}

export default FormProductEdit;

