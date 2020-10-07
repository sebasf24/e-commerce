import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import FormCategory from './Component/FormCategory/FormCategory.jsx'
import ProductCard from './Component/ProductCard/ProductCard.jsx';
import Product from './Component/Product/Product.jsx'
import Catalogue from './Component/Catalogue/Catalogue.jsx'
import data,{Notebook, Disco, MemoriaRAM,Usb,Teclado} from './data.js';


function App() {
  return (
    <div>
     
    <Route exact path='/' render={()=> <Catalogue Products={data}/>} />
    <Route path='/product/:id' component={Product}/>
    
    </div>
  );
}

export default App;
