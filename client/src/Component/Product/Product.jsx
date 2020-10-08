import React from 'react';
import {Link} from 'react-router-dom';
import data from '../../data.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image, Col, Row,Container, Button } from 'react-bootstrap';

export default function Product(props) {
    const id= props.match.params.id;
    const product = data[id];
    console.log(product);
    const { name, description, price, stock, img }=product;

    return (
        <Container style={{width:'70rem'}}>
           <Card style={{border:'none'}}>
           <Row >
            {console.log(name)}
            <Col>
            <Image style={{width:'25rem',height:'15rem'}} src={img} rounded />
            </Col>
            <Col>

                <Card border="ligth" style={{ width: '30rem',height:'30rem' }} className="text-center" text="dark">
                <br />
                <Card.Header><Link to="/products"><Button variant="light"  aling="rigth">X</Button></Link></Card.Header>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>{price}</Card.Subtitle>
                    <br />
                    <Card.Body className="text-justify">
                        <Card.Text className="card-body">
                            {description}
                        </Card.Text>
                    </Card.Body>
                    <br/>
                    <Card.Footer>
                    <Button variant="secondary">Agregar</Button>
                    </Card.Footer>
                </Card>
            </Col>
        
        </Row>
           </Card>
        </Container>
    )

}

