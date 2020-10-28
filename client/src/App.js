import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FormCategory from './Component/FormCategory/FormCategory.jsx'
import Product from './Component/Product/Product.jsx'
import Catalogue from './Component/Catalogue/Catalogue.jsx'
import LoginUser from './Component/LoginUser/LoginUser'
import homeCategories from './Component/FormCategory/HomeCategories'
import Cart from './Component/carrito/Cart.jsx'
import { useSelector } from 'react-redux';
import ListUser from './Component/User/ListUser'
import FormAddUser from './Component/User/FormAddUser'
import  DashboardAdmin  from './Component/Dashboard/DashboardAdmin';
import Home from './Component/home/home.jsx' 
import Order from './Component/Order/Order.jsx';
import FormAdmin from './Component/formProductAdmin/formProductAdmin';
import FormAdminAdd from './Component/formProductAdmin/formProductAdd';
import NavBar from './Component/NavBar/navbar.jsx';
import resetPassword from './Component/LoginUser/resetPassword';
import newPassword from './Component/LoginUser/newPassword';
import Footer from './Component/footer/footer';
import About from './Component/About/About';
import UserProfile from './Component/User/UserProfile'
import Shipping from './Component/Checkout/Shipping'
import Checkout from './Component/Checkout/Checkout'
import Payment from './Component/Checkout/Payment'

!localStorage.carritoLocal && localStorage.setItem("carritoLocal",JSON.stringify([]))
!localStorage.stock && localStorage.setItem("stock",JSON.stringify({}))
!localStorage.total && localStorage.setItem("total",JSON.stringify(0))

function App() {  
  const productsl = useSelector(state=>state.products);

  const userlog=useSelector(state=>state.user)
  const us=userlog.user
  
  return (
    <Router >
    <Route path='/' render={()=> <NavBar islog={us? us : undefined}/>} />
    <Route exact path='/' render={Home}/>
    <Route exact path='/order' component={Order}/>
    <Route exact path='/admin' component={us && us.typeUser==='Admin' ?DashboardAdmin : Catalogue}/>
    <Route exact path='/cart' render={()=><Cart islog={us? us : undefined}/>}/>
    <Route exact path={['/products','/products/category/:id']} component={Catalogue} />
    <Route exact path='/products/:id' component={Product} onEnter={userlog}/>
    <Route exact path='/listCategory' component={homeCategories} onEnter={userlog}/>
    <Route path='/addCategory' component={FormCategory}/>
    <Route exact path='/search' render={()=> <Catalogue Products={productsl.products}/>} />
    <Route path='/login' component={LoginUser}/>
    <Route path='/listUser' component={ListUser}/>
    <Route path='/addUser' component={FormAddUser}/>
    <Route exact path='/administrar' component={FormAdmin}/>
    <Route exact path='/administrarAdd' component={FormAdminAdd}/>
    <Route exact path='/resetPass' component={resetPassword}/>
    <Route exact path='/newPass' component={newPassword}/>
    <Route exact path='/me' component={UserProfile}/>
    <Route exact path='/checkout' component={Checkout}/>
    <Route exact path='/shipping' component={Shipping}/>
    <Route exact path='/payment' component={Payment}/>
    <Route exact path='/about' component={About} onEnter={userlog}/>
    <Route path='/' component={ Footer } />

    </Router>
  );
}


export default App;




