import React,{useEffect} from 'react';
import {Container,Card,Button,Navbar,Nav} from 'react-bootstrap';
// import ItemCart from './ItemCart.jsx';
import OrderLine from './OrderLine.jsx';
import styles from './Order.module.css';
// 
import {agregarProductoCarrito,vaciarCarrito} from "../../actions/cart";
import { useDispatch, useSelector, useStore } from 'react-redux';

export default function Order(){
    console.log("COMPONENTE ORDEN");
const dispatch = useDispatch();
//const products = useSelector(store=>store.productsCart)
//let productosCarrito = products.productos
//obtengo los productos de localStorage
if(!localStorage.carritoLocal){
    localStorage.setItem("carritoLocal",JSON.stringify([]))
}
var prodGuardados = JSON.parse(localStorage.getItem("carritoLocal"))
console.log("PRODUCTOS GUARDADOS = ", prodGuardados);
// const vaciar=()=>{
//     dispatch(vaciarCarrito())
//     localStorage.setItem("carritoLocal",JSON.stringify([]))
// }

    return (
        <Container className={styles.container}>
            
            <Container className={styles.list}>
                <Navbar className={styles.heaedr}>
                    <Navbar.Collapse className="justify-content-start">
                        <Navbar.Brand> ORDER ! </Navbar.Brand>
                    </Navbar.Collapse>
                    <Nav className="mr-auto">
                    {/* <Button  onClick={vaciar} variant="outline-danger">VACIAR CARRITO</Button> */}
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
                    
                    {/* <Card.Footer className={styles.boton}>
                        <Button className={styles.botonCancelar+' '+styles.button}>Cancelar</Button>
                        <Button className={styles.botonAceptar+' '+styles.button}>Finalizar Compra</Button>
                    </Card.Footer> */}
                    
                </Card>
                </Container>
            </Container>

            <Container className={styles.totales}>

               
            </Container>
         

        </Container>
    )

} 



// //COMPONENTE ORDER
// export class Order extends Component {
//     constructor(props){
//       super(props)
//       this.state = {
//         products:[]
//       }
//     }



//     //TRAE EL CARRITO DE UN USUARIO.. LO PRECARGA Y LO DEJA EN EL STORE DE REDUX
//   componentDidMount(){
//     if (this.props.user.id != 0){
//       this.props.getProductsCart(this.props.user.id);
//     }
//     this.props.setRedirect(true)
//   }

//   componentWillUnmount(){
//     this.props.setRedirectOff()
//   }


//     //FUNCION QUE CALCULA EL TOTAL DE LA COMPRA
//   calculoTotal (products) {
//     var totalDeOrden = 0;
//     if (this.props.user.id !=0){
//       products.map( e => {
//         totalDeOrden = totalDeOrden + (e.order_line.price * e.order_line.cantidad)
//       })
//       return totalDeOrden;
//     } else {
//       products.map( e =>{
//         totalDeOrden = totalDeOrden + (Number(e.price) * Number(e.cantidad));
//       })
//       return totalDeOrden;
//     }
//   }

//     /*TOTAL DEL COSTO DE UN PRODUCTO */
//   <h5> Total $ {el.cantidad*Number(el.price)}</h5>