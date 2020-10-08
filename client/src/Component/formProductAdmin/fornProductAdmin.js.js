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

    const envioformulario = (e) => {
        e.preventDefault();
        let typeSend = e.target.attributes[1].value;


        switch (typeSend) {
            case "add":
                //validar que ningun campo este vacio
                if (product.name === '') {
                    let p = document.getElementById('pName');
                    p.innerText = "No puede ser vacio";
                    p.style.color = "red";
                    p.style.fontWeight = 'bold';

                    setTimeout(() => {
                        p.innerText = null;
                    }, 3000);
                }
                if (product.description === '') {
                    let p = document.getElementById('pDescripcion');
                    p.innerText = "No puede ser vacio";
                    p.style.color = "red";
                    p.style.fontWeight = 'bold';
                    setTimeout(() => {
                        p.innerText = null;
                    }, 3000);
                }
                if (product.price === '') {
                    let p = document.getElementById('pPrice');
                    p.innerText = "No puede ser vacio";
                    p.style.color = "red";
                    p.style.fontWeight = 'bold';
                    setTimeout(() => {
                        p.innerText = null;
                    }, 3000);
                }
                if (product.stock === '') {
                    let p = document.getElementById('pStock');
                    p.innerText = "No puede ser vacio";
                    p.style.color = "red";
                    p.style.fontWeight = 'bold';
                    setTimeout(() => {
                        p.innerText = null;
                    }, 3000);
                }
                if (product.img === '') {
                    let p = document.getElementById('pImg');
                    p.innerText = "No puede ser vacio";
                    p.style.color = "red";
                    p.style.fontWeight = 'bold';
                    setTimeout(() => {
                        p.innerText = null;
                    }, 3000);
                }

                axios.post('/products', product)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })

                break;
            case "edit":
                //validar que ningun campo este vacio
                if (product.id === '') {
                    let p = document.getElementById('pId');
                    p.innerText = "No puede ser vacio";
                    p.style.color = "red";
                    p.style.fontWeight = 'bold';
                    setTimeout(() => {
                        p.innerText = null;
                    }, 3000);

                }
                if (product.name === '') {
                    let p = document.getElementById('pName');
                    p.innerText = "No puede ser vacio";
                    p.style.color = "red";
                    p.style.fontWeight = 'bold';
                    setTimeout(() => {
                        p.innerText = null;
                    }, 3000);

                }
                if (product.description === '') {
                    let p = document.getElementById('pDescripcion');
                    p.innerText = "No puede ser vacio";
                    p.style.color = "red";
                    p.style.fontWeight = 'bold';
                    setTimeout(() => {
                        p.innerText = null;
                    }, 3000);
                }
                if (product.price === '') {
                    let p = document.getElementById('pPrice');
                    p.innerText = "No puede ser vacio";
                    p.style.color = "red";
                    p.style.fontWeight = 'bold';
                    setTimeout(() => {
                        p.innerText = null;
                    }, 3000);
                }
                if (product.stock === '') {
                    let p = document.getElementById('pStock');
                    p.innerText = "No puede ser vacio";
                    p.style.color = "red";
                    p.style.fontWeight = 'bold';
                    setTimeout(() => {
                        p.innerText = null;
                    }, 3000);
                }
                if (product.img === '') {
                    let p = document.getElementById('pImg');
                    p.innerText = "No puede ser vacio";
                    p.style.color = "red";
                    p.style.fontWeight = 'bold';
                    setTimeout(() => {
                        p.innerText = null;
                    }, 3000);
                }

                axios.put('/products', product)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })

                break;
            case "delete":
                if (product.id === '') {
                    let p = document.getElementById('pId');
                    p.innerText = "No puede ser vacio";
                    p.style.color = "red";
                    p.style.fontWeight = 'bold';
                    setTimeout(() => {
                        p.innerText = null;
                    }, 3000);

                }

                axios.delete(`/products/${product.id}`)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })

                break;

            default:
                break;
        }

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
                        style={{ display: 'none' }} />
                    <Button id='btnGet' className='ml-1' variant="primary" type="button" onClick={clickEditId} style={{ display: 'none' }}>Get Product</Button>
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
                <Form.Control type='text' placeholder='img'
                    name='img'
                    onChange={obtenerInfo}
                    value={img}
                /><p id="pImg"></p>
                <br /><br />

                <Button type="submit" variant="primary">Send</Button>

            </Form>
        </Container>
    )
}

export default FormProductAdmin;

