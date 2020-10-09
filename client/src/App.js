import React,{useEffect} from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import FormCategory from './Component/FormCategory/FormCategory.jsx'
import Product from './Component/Product/Product.jsx'
import Catalogue from './Component/Catalogue/Catalogue.jsx'
import data from './data.js';
import {connect} from 'react-redux'
import { useDispatch, useSelector, useStore } from 'react-redux';
import {mostrarProductos} from "../src/actions/products.js"




function App(props) {
  console.log(props)
 /*  const dispatch=useDispatch();
  useEffect(()=>{
   
  })
   
  const store = useStore();
  dispatch(action.mostrarProductos())
 .then(res=>{
   console.log(res)
 })
 const products = useSelector(store=>store.products)  */
 if(!props.products.length){
  props.buscarProducto()
 }
 //
 
  return (
    <div>
     
    <Route exact path='/products' render={()=> <Catalogue Products={props.products}/>} />
    <Route path='/products/:id' component={Product}/>
    <Route path='/addCategory' component={FormCategory}/>
    
    </div>
  );
}

function mapStateToProps(state){
  return{
      products:state.productos,
  }
}
function mapDispatchToProps(dispatch){
  return{
      buscarProducto: ()=>dispatch(mostrarProductos()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



