import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image, Col, Row,Container, Button } from 'react-bootstrap';

export default function Product(Product) {
    const { id, name, description, price, stock, img } = Product.Product;

    return (
        <Container style={{width:'70rem'}}>
           <Card style={{border:'none'}}>
           <Row >
            {console.log(name)}
            <Col>
            <Image style={{width:'25rem',height:'15rem'}} src={img} rounded />
            </Col>
            <Col>

                <Card border="ligth" style={{ width: '30rem',height:'15rem' }} className="text-center" text="dark">
                <br />
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>---------------------------------------</Card.Subtitle>
                    <Card.Subtitle>{price}</Card.Subtitle>
                    <br />
                    <Card.Body className="text-justify">
                        <Card.Text className="card-body">
                            {description}
                        </Card.Text>
                    </Card.Body>
                    <Button variant="secondary">Agregar</Button>
                </Card>
            </Col>
        
        </Row>
           </Card>
        </Container>
    )

}


{/* <div>
            <h1><div>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>{price}</p>
            <p>{stock}</p>
            <img src={img}/>
            <button onClick={()=>alert('hola')}>Add to cart</button>
        </div></h1>
            <p>{description}</p>
            <p>{price}</p>
            <p>{stock}</p>
            <img src={img}/>
            <button onClick={()=>alert('hola')}>Add to cart</button>
        </div> */}