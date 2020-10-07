import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import FormCategory from './Component/FormCategory/FormCategory.jsx'
import Product from './Component/Product/Product.jsx'
import Catalogue from './Component/Catalogue/Catalogue.jsx'
import data from './data.js';


function App() {
  return (
    <div>
     
    <Route exact path='/products' render={()=> <Catalogue Products={data}/>} />
    <Route path='/products/:id' component={Product}/>
    <Route path='/addCategory' component={FormCategory}/>
    
    </div>
  );
}

export default App;
