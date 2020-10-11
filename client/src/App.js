import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import FormCategory from './Component/FormCategory/FormCategory.jsx'
import Product from './Component/Product/Product.jsx'
import Catalogue from './Component/Catalogue/Catalogue.jsx'
import FormularioAdmin from './Component/formProductAdmin/fornProductAdmin.js.js'

import { useDispatch, useSelector, useStore } from 'react-redux';
import {mostrarProductos} from "../src/actions/products.js"
import NavBar from './Component/NavBar/navbar.jsx';



function App() {  
 
 const productsl = useSelector(state=>state.products);
 const {products} = productsl;
 //console.log(products);
 //
 const dispatch=useDispatch();
  useEffect(()=>{

    dispatch(mostrarProductos())
    return ()=>{

    }
  },[])
 
  return (
  
    <Router forceRefresh>
     
    <Route path='/' component={NavBar}/>
    <Route exact path='/admin' component={FormularioAdmin}/>
    <Route exact path='/products' render={()=> <Catalogue Products={products}/>} />
    <Route path='/products/:id' component={Product}/>
    <Route path='/addCategory' component={FormCategory}/>
    
    </Router>
  );
}


export default App;



