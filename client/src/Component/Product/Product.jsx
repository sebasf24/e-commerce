import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {mostrarProducto_id} from "../../actions/products.js";
import styles from './Product.module.css';
import { BiArrowBack } from "react-icons/bi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image, Col, Row, Container, Button } from 'react-bootstrap';

export default function Product(props) {
    const id = props.match.params.id;

    const productS = useSelector(state=>state.products);
    
    const {selectedProduct}=productS;
    const { name, description, price, stock, img }=selectedProduct;
    
    let base64ToString;
    (img) && (base64ToString = Buffer.from(img.data, "base64").toString())
    
    

    var imagen = "https://www.pixinvent.com/materialize-material-design-admin-template/laravel/demo-4/images/cards/headphones-2.png"

    const dispatch=useDispatch();
  useEffect(()=>{

    dispatch(mostrarProducto_id(id))
    return ()=>{

    }
  },[])
  

    return (
        <Container className={styles.container}>
            <Card className={styles.card}>
                    <Link className={styles.botonlink} to={`/products/`}>
                        <BiArrowBack/>
                    </Link>
                    <div className={styles.imagen}>
                        <Image className={styles.img}
                            src={base64ToString} 
                        rounded />
                    </div>
                    <Card.Title className={styles.titulo}>{name}</Card.Title>

                    <Card.Subtitle className={styles.stock}>{stock} disponibles</Card.Subtitle>
                   
                    <Card.Text className={styles.descrip}>
                    <hr class="clearfix w-100"/>
                        {description}
                    </Card.Text>

                    <Card.Subtitle className={styles.precio}>{'$'+price}</Card.Subtitle>

                    <Card.Footer className={styles.botones}>
                        <Button className={styles.boton +' '+ styles.boton1} variant="secondary">AGREGAR AL CARRITO</Button>
                        <Button className={styles.boton +' '+ styles.boton2} variant="secondary">COMPRAR AHORA</Button>
                    </Card.Footer>
                  
            </Card>
        </Container>
    )

}

