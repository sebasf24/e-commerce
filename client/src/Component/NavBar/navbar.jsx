import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './technav1.png';
import { Nav, NavDropdown,Navbar,Form,FormControl} from 'react-bootstrap';
import styles from './navbar.module.css';
import {useDispatch,useSelector} from 'react-redux'
import SearchBar from '../SearchBar/SearchBar.js';
import {Avatar, Button, makeStyles, MenuItem} from '@material-ui/core';
import {AiOutlineShoppingCart,AiOutlineUser} from 'react-icons/ai';
import {BiHome} from 'react-icons/bi';
import {logoutUser} from '../../actions/user'

export default function NavBar (islog){
    const prodUsuario = useSelector(store => store.productsCart).productos
    let prodLStorage = JSON.parse(localStorage.getItem("carritoLocal"))
    let notProd = prodUsuario.length ? prodUsuario.length : prodLStorage.length

    const dispatch=useDispatch();
    const usuario=islog.islog 
return (
    <>
    <nav className={styles.nav}>
        <div className={styles.logo}>        
            <Link to={'/'}>
                <img className={styles.logotech} src={Logo} width="90" height="40" alt="" />
            </Link> 
            <Link to={'/'}>
                <BiHome className={styles.iconos}/>
            </Link>
        </div>
        <div className={styles.search}>
            <SearchBar/>
        </div>
        <div className={styles.navSec}>
            <Link className={styles.navBoton} to={'/about'}>
                <span>Nosotros</span>
            </Link>
            <Link className={styles.navBoton} to={'/products'}>
               <span>Catalogo</span>
            </Link>
            <Link className={ styles.container_carrito } to={'/cart'}>
                <Button className={styles.boton_carrito}><AiOutlineShoppingCart className={styles.iconos}/>
                    {
                        notProd?
                        <span className={styles.notCarrito}>{notProd}</span>
                        : ''
                    }
                </Button>
            </Link>
        </div>
        <div className={styles.user}> 
                {  usuario && usuario.typeUser==='Admin'
                    ? 
                    <Link className={styles.navSec} to={'/admin'}>Admin</Link>
                    : <div></div>}
                {
                usuario && usuario.id?
            <NavDropdown>
                <MenuItem onClick={()=>{window.location.href='./me'}}>My Profile</MenuItem>
                <MenuItem>Your gits</MenuItem>
                <MenuItem>Starred gists</MenuItem>
                <MenuItem onClick={()=>{dispatch(logoutUser())}} >Sign out</MenuItem>
            </NavDropdown>
            : <div></div>
            }
            <Link to='/login'>
                <Avatar className={styles.iconos}/>
            </Link>
        </div>
    </nav>
    <div className={styles.background}></div>
    </>
 )
}
