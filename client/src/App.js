import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import FormCategory from './Component/FormCategory/FormCategory.jsx'
import Product from './Component/Product/Product.jsx'
import Catalogue from './Component/Catalogue/Catalogue.jsx'
import FormularioAdmin from './Component/formProductAdmin/fornProductAdmin.js.js'
import homeCategories from './Component/FormCategory/HomeCategories'

import NavBar from './Component/NavBar/navbar.jsx';

function App() {  
 
  return (
  
    <Router forceRefresh >
    <Route path='/' component={NavBar}/>
    <Route exact path='/admin' component={FormularioAdmin}/>
    <Route exact path={['/products','/products/category/:id']} component={Catalogue} />
    <Route exact path='/products/:id' component={Product}/>
    <Route exact path='/listCategory' component={homeCategories}/>
    <Route path='/addCategory' component={FormCategory}/>
    </Router>
  );
}


export default App;



