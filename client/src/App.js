import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
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
import FormAdmin from './Component/formProductAdmin/formProductAdmin';
import FormAdminAdd from './Component/formProductAdmin/formProductAdd';

import NavBar from './Component/NavBar/navbar.jsx';


function App() {  
  const productsl = useSelector(state=>state.products);

  return (
  
    <Router >
    <Route path='/' component={NavBar}/>
    <Route exact path='/cart' component={Cart}/>
    <Route exact path='/admin' component={DashboardAdmin}/>
    <Route exact path={['/products','/products/category/:id']} component={Catalogue} />
    <Route exact path='/products/:id' component={Product}/>
    <Route exact path='/listCategory' component={homeCategories}/>
    <Route path='/addCategory' component={FormCategory}/>
    <Route exact path='/search' render={()=> <Catalogue Products={productsl.products}/>} />
    <Route path='/login' component={LoginUser}/>
    <Route path='/listUser' component={ListUser}/>
    <Route path='/addUser' component={FormAddUser}/>
    <Route exact path='/administrar' component={FormAdmin}/>
    <Route exact path='/administrarAdd' component={FormAdminAdd}/>
    
    
    </Router>
  );
}


export default App;




