import React,{useEffect} from 'react';
import {Container,Card,Button,Navbar,Nav} from 'react-bootstrap';
import OrderLine from './OrderLine.jsx';
import styles from './Order.module.css';
import { useDispatch, useSelector, useStore } from 'react-redux';

export default function Order(){
    console.log("COMPONENTE ORDEN");
const dispatch = useDispatch();

var prodGuardados = JSON.parse(localStorage.getItem("carritoLocal"))
console.log("PRODUCTOS GUARDADOS = ", prodGuardados);


    return (
        <Container className={styles.container}>
            <Container className={styles.list}>
                <Navbar className={styles.heaedr}>
                    <Navbar.Collapse className="justify-content-start">
                        <Navbar.Brand> ORDER ! </Navbar.Brand>
                    </Navbar.Collapse>
                    <Nav className="mr-auto">
                    </Nav>
                </Navbar>
                <Container className={styles.lista}>
                {
                   
                   prodGuardados
                   ?
                   prodGuardados.map(producto=>{
                        return(
                            <div>
                                <OrderLine producto={producto}/>
                                <hr class="clearfix w-100"/>
                            </div>
                        )
                    })
                    :
                    <div></div>
                }
                </Container>

                <Container className={styles.lista}>
                <Navbar className={styles.heaedr}>
                        <Navbar.Collapse className="justify-content-start">
                            <Navbar.Brand> Resumen </Navbar.Brand>
                        </Navbar.Collapse>
                </Navbar>

                <Card className={styles.total}>
                    <div className={styles.items}> 
                        <Card.Subtitle>Items</Card.Subtitle>
                        <p>{prodGuardados.length}</p>
                    </div>

                    <div className={styles.precioFinal}>
                        <Card.Subtitle>TOTAL</Card.Subtitle>
                     <p>{
                         prodGuardados.length 
                            ?
                            prodGuardados.reduce((acc,curr)=>{
                             return acc+=curr.price*curr.stock
                        },0)
                            : 
                            0
                        }
                    </p>
                    </div> 
                </Card>
                </Container>
            </Container>

            <Container className={styles.totales}>

               
            </Container>
         

        </Container>
    )

} 


