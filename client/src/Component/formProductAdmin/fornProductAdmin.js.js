import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const FormProductAdmin = () => {
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
    //leer datos del formulario
    const obtenerInfo = e => {
        console.log('producto imagen', product.img);

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })

    }

    //obtener los datos de agregar
    const clickAdd = () => {
        let typeSend = document.getElementById('formProduct');
        typeSend.name = "add";
        let formTitle = document.getElementById('formTitle');
        formTitle.innerText = "Add Product";
        let input = document.getElementById('input');
        input.style.display = "none";
    }

    //obtener los datos de editar
    const clickEdit = () => {
        let typeSend = document.getElementById('formProduct');
        typeSend.name = "edit";
        let formTitle = document.getElementById('formTitle');
        formTitle.innerText = "Edit Product";
        let input = document.getElementById('input');
        input.style.display = 'inline';
        let btn = document.getElementById('btnGet');
        btn.style.display = "inline";
    }
    //obtener los datos de eliminar
    const clickDelete = () => {
        let typeSend = document.getElementById('formProduct');
        typeSend.name = "delete";
        let formTitle = document.getElementById('formTitle');
        formTitle.innerText = "Delete Product";
        let input = document.getElementById('input');
        input.style.display = "block";
        let btn = document.getElementById('btnGet');
        btn.style.display = "block";
    }

    const clickEditId = () => {
        if (product.id !== '') {

            axios.get(`/product/${product.id}`)
                .then(res => {
                    setProduct(res);
                })
        }
    }

    const cargarProducto=() =>{
/*         const fs = require('fs');

        let buff = fs.readFileSync(product.img);
        let base64data = buff.toString('base64');

console.log('Image converted to base 64 is:\n\n' + base64data); */
        axios.post('http://localhost:3000/products', product, {
            headers: {
                'Content-Type': 'application/json'
            }
          });
    }

    function encodeImageFileAsURL(e) {
        var input = e.target;
        var fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function (event) {
            //console.log(event);
            var base64=event.target.result;
            let buff = new Buffer(base64, 'base64');

            setProduct({
                ...product,
                img: base64
            })

            //console.log(event.target.result);
        }
      }

    const envioformulario = (e) => {
        e.preventDefault();
        let typeSend = e.target.attributes[1].value;
        console.log(product.img)
    


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

    const clickGet = () => {
        axios.get("/products")
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Container>
            <Form id='formProduct' name="add" onSubmit={envioformulario}>

                <Form.Label id='formTitle'>Add Product</Form.Label>
                <div>
                    <input id="input" type="text" placeholder="Insert id"
                        name='id'
                        onChange={obtenerInfo}
                        value={id}
                     />
                    <Button id='btnGet' className='ml-1' variant="primary" type="button" onClick={clickEditId}>Get Product</Button>
                    <p id="pId"></p>
                </div>

                <Form.Group controlId="formBasic">
                    <Button variant="primary" type="button" onClick={clickGet}>Traer Productos</Button>
                </Form.Group>

                <Form.Group controlId="formBasic">
                    <Button className='mr-3' variant="primary" type="button" onClick={clickAdd}>Add</Button>
                    <Button className='mr-3' variant='primary' type="button" onClick={clickEdit}>Edit</Button>
                    <Button variant='danger' type="button" onClick={clickDelete}>Delele</Button>
                </Form.Group><br />

                <Form.Label>Name</Form.Label>
                <Form.Control column="sm" size="sm" type='text' placeholder='name'
                    name='name'
                    onChange={obtenerInfo}
                    value={name}
                /><p id="pName"></p>
                <br /><br />

                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='description'
                    name='description'
                    onChange={obtenerInfo}
                    value={description}
                /><p id="pDescripcion"></p>
                <br /><br />

                <Form.Label>Price</Form.Label>
                <Form.Control type='number' placeholder='price'
                    name='price'
                    onChange={obtenerInfo}
                    value={price}
                /> <p id='pPrice'></p>
                <br /><br />

                <Form.Label >Stock</Form.Label>
                <Form.Control type='number' placeholder='stock'
                    name='stock'
                    onChange={obtenerInfo}
                    value={stock}
                /><p id="pStock"></p>
                <br /><br />

                <Form.Label>Img</Form.Label>
                <Form.Control type='file' placeholder='img'
                    name='img'
                    onChange={encodeImageFileAsURL}
                    //value={img}
                /><p id="pImg"></p>
                {/* <img src={product.img}/> */}
                <br /><br />

                <Button onClick={cargarProducto} type="submit" variant="primary">Send</Button>

            </Form>
        </Container>
    )
}

export default FormProductAdmin;

