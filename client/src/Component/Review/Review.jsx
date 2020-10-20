import React from 'react';
import {Card,Container} from 'react-bootstrap';
import {BsStarFill,BsStar} from "react-icons/bs";
import style from './Review.module.css';

export default function Review(){
    
        return(
            <Container>
                <Card>
                    <Card.Title>Opiniones sobre el producto</Card.Title>
                    <Card.Subtitle><Card.Text className={style.promReview}>4.0</Card.Text><BsStarFill color={'blue'} /><BsStarFill color={'blue'} /><BsStarFill color={'blue'} /><BsStarFill color={'blue'} /><BsStar color={'blue'} /></Card.Subtitle>
                    <Card.Text>Muy bueno</Card.Text>
                    <Card.Body>Buena calidad,mas de lo esperado</Card.Body>
                </Card>
            </Container>
        )
    
}