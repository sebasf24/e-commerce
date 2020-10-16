import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import FormCategory from './Component/FormCategory/FormCategory.jsx'
import Product from './Component/Product/Product.jsx'
import Catalogue from './Component/Catalogue/Catalogue.jsx'
import FormularioAdmin from './Component/formProductAdmin/formProductAdmin.js'
import homeCategories from './Component/FormCategory/HomeCategories'
import Cart from './Component/carrito/Cart.jsx'

import NavBar from './Component/NavBar/navbar.jsx';

function App() {  
 
  return (
  
    <Router >
    <Route path='/' component={NavBar}/>
    <Route exact path='/cart' component={Cart}/>
    <Route exact path='/admin' component={FormularioAdmin}/>
    <Route exact path={['/products','/products/category/:id']} component={Catalogue} />
    <Route exact path='/products/:id' component={Product}/>
    <Route exact path='/listCategory' component={homeCategories}/>
    <Route path='/addCategory' component={FormCategory}/>
    </Router>
  );
}


export default App;




