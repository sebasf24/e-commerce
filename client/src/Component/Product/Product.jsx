import {enviarAlCarritoLocalStorage,sumarCarritoLocal} from '../carrito/localStorage'
import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Cookies from 'universal-cookie';
import FormReview from '../Review/FormReview.jsx';
import Reviews from '../Review/ReviewContainer.jsx';
//ACTIONS
import {mostrarProducto_id} from "../../actions/products.js";
import {agregarProductoCarrito} from '../../actions/cart.js';

//ESTILOS/BOOTSTRAP
import styles from './Product.module.css';
import { BiArrowBack,BiCart} from "react-icons/bi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image,Container, Button,Form } from 'react-bootstrap';

export default function Product(props) {
    const cookies = new Cookies();
    const [cantidad, setCantidad] = useState(1)
//estados redux
    const productosCarrito = useSelector(state=>state.productsCart).stockProduct;
    const {selectedProduct,reviews} = useSelector(state=>state.products);
    const reviewsP=reviews
    
//obtengo id de usuario log
const userlog=useSelector(state=>state.user)
const idUser=userlog.user.id
console.log(idUser)
    

    const { name, description, price, stock, img }=selectedProduct;

//selecciono producto por id 
    const id = props.match.params.id;
    const dispatch=useDispatch();
    let prodStock = JSON.parse(localStorage.stock)[id]
//store products
    let base64ToString;
    (img) && (base64ToString = Buffer.from(img.data, "base64").toString())

    useEffect(()=>{
        
        setCantidad(1)
        dispatch(mostrarProducto_id(id))
    },[])

    //store carrito  
    
    const sumarProdLocalStorage=()=>{
            let prodStock = JSON.parse(localStorage.stock)[id]
            sumarCarritoLocal(prodStock,cantidad,selectedProduct,id)
    }

    const cambiarCantidad=(e)=>{
        let prodStock = JSON.parse(localStorage.stock)[id]
        if( !prodStock && e.target.value>stock){
            alert(" no hay estock suficiente")
            setCantidad(stock)
            return
        }

        if(prodStock && e.target.value>prodStock.stock){
            alert("2 no hay estock suficiente")
            setCantidad(prodStock.stock)
            return
        }
        setCantidad(e.target.value)
    }
    console.log(prodStock)

const sumarAlCarrito = ()=>{
    console.log(productosCarrito)
    let prodStock = JSON.parse(localStorage.stock)[id]

    const idUser=userlog.user.id

    if(idUser){
        var productos_line={
            productId:parseInt(id),
            cantidad:cantidad,
            price:price,
            estado:"carrito"}

        dispatch(agregarProductoCarrito(idUser,productos_line))
   }
     
// si el producto no existe lo agrega 
    if(!prodStock && cantidad<stock){
            sumarProdLocalStorage()
            enviarAlCarritoLocalStorage(selectedProduct)
            return 
        }
 //si el prod exite, verifica el stock no existe lo agrega        
    if(prodStock && prodStock.stock>0){
            sumarProdLocalStorage()
            return 
        }
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
        <p></p>
        <FormReview id={id}></FormReview>
        </div>
    )

}

