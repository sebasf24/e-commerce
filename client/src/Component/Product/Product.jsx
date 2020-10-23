import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {mostrarProducto_id,mostrarReviews} from "../../actions/products.js";
import {agregarProductoCarrito} from '../../actions/cart.js';
import Reviews from '../Review/ReviewContainer.jsx';

import styles from './Product.module.css';
import { BiArrowBack,BiCart} from "react-icons/bi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image, Col, Row, Container, Button,Form } from 'react-bootstrap';


export default function Product(props) {

    
    const [cantidad, setCantidad] = useState(1)
    const productoCarrito = useSelector(state=>state.productsCart);
    const productS = useSelector(state=>state.products);
    const {selectedProduct}=productS;
    const reviewsP=productS.reviews
    console.log(reviewsP)
    const { name, description, price, stock, img }=selectedProduct;
    const id = props.match.params.id;

    let prodStock = JSON.parse(localStorage.stock)[id]

    const dispatch=useDispatch();
//store products


    let base64ToString;
    (img) && (base64ToString = Buffer.from(img.data, "base64").toString())

    useEffect(()=>{
        setCantidad(1)
        dispatch(mostrarProducto_id(id))
        dispatch(mostrarReviews(id))
        return ()=>{}},[])

        console.log('Reviews',productS);
    //store carrito    

    const cambiarCantidad=(e)=>{
        
        if( !prodStock && e.target.value>stock){
            alert("no hay estock suficiente")
            setCantidad(stock)
            return
        }

        if( prodStock && e.target.value>prodStock.cantidad){
            alert("no hay estock suficiente")
            setCantidad(prodStock.stock)
            return
        }
        setCantidad(e.target.value)
    }
            
    const sumarAlCarrito = ()=>{
       
// si el producto no existe lo agrega 
     if(!prodStock){
        if(cantidad>stock){
            alert("no hay stock suficiente")
            return
        }
            localStorage.setItem("stock",JSON.stringify(
                Object.assign(JSON.parse(localStorage.stock),
                    {[id]:{ cantidad: cantidad,
                            stock:selectedProduct.stock-cantidad,
                            precio:selectedProduct.price*cantidad 
                            }
                            })))                  
        } 
//si el producto existe, suma la cantidad,resta el stock y modifica el precio total

        if(prodStock && prodStock.stock>=0){
            if(cantidad>prodStock.stock){
                alert("no hay stock suficiente")
                return
            }
                localStorage.setItem("stock",JSON.stringify(
                    Object.assign(JSON.parse(localStorage.stock),
                    {[id]:{ cantidad: ++prodStock.cantidad,
                            stock:selectedProduct.stock-prodStock.cantidad,
                            precio: selectedProduct.price *prodStock.cantidad
                                }
                                })))   
        }    

       // console.log("Product", Product);
        // existe = no
        // Loop recorriendo ls 
        //     pregunto si id = Producto id
        //      existe = si
        // End Loop
        // if existe == no
        //      lo agrego
        // else
        //      lo ignoro
        var ls = JSON.parse(localStorage.getItem("carritoLocal"));
        var existe = false;
        for (let i = 0; i < ls.length; i++) {
            if(ls[i].id == selectedProduct.id)
                existe = true;
        } 
        if(existe == false)
        
            {   
                localStorage.setItem("carritoLocal",JSON.stringify(
                JSON.parse(localStorage.getItem("carritoLocal"))            
                .concat(selectedProduct)
                ))
            }

        dispatch(agregarProductoCarrito(Product))
        
    }
        
    let botones = <Form >
    <Form.Label id="cantidad">Cantidad</Form.Label>
    <Form.Control value={cantidad} onChange={cambiarCantidad} placeholder="1" min={1} max={stock} className={styles.cantidad} type="number"/>
    <Button onClick={sumarAlCarrito} className={styles.boton +' '+ styles.boton1} 
       ><BiCart/> AGREGAR AL CARRITO</Button>
    <Button className={styles.boton +' '+ styles.boton2} 
        >COMPRAR AHORA</Button>
    </Form>

    let cartel = <div className={styles.sinstock}>
    <h4>Sin Stock</h4>
    <p>Lo sentimos, no disponemos de este articulo por el momento. Pronto lo tendremos de vuelta!</p>
    </div>

        
    return (<div>
        <Container className={styles.container}>
            <Card className={styles.card}>
                    <Link className={styles.botonlink} to={`/products`}>
                        <BiArrowBack/>
                    </Link>
                    <div className={styles.imagen}>
                        <div className={styles.contenedorImg}>
                            <Image className={styles.img}
                            src={base64ToString} />
                        </div>
                    </div>
                    <Card.Title className={styles.titulo}>
                        {name}

                    </Card.Title>

                    <Card.Subtitle className={styles.stock}>{prodStock ? prodStock.stock : stock} disponibles
                        <hr class="clearfix w-100"/>
                    </Card.Subtitle>
                    <Card.Text className={styles.descrip}>
                    
                        {description}
                    
                    </Card.Text>
                    <Card.Subtitle className={styles.precio}>
                        <hr class="clearfix w-100"/>
                        {'$'+price}</Card.Subtitle>

                    <Card.Footer className={styles.botones}>
                                 
                        
                        {stock==0 ? cartel : botones}
                    </Card.Footer>
                  
            </Card>
        </Container>
        <p></p>
        <Reviews Reviews={reviewsP}></Reviews>
        </div>
    )

}

