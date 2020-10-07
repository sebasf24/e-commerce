import React from 'react';
import './App.css';
import FormCategory from './Component/FormCategory/FormCategory.jsx'
import ProductCard from './Component/ProductCard/ProductCard.jsx';
import Product from './Component/Product/Product.jsx'
import Catalogue from './Component/Catalogue/Catalogue.jsx'
import data,{Notebook, Disco, MemoriaRAM,Usb,Teclado} from './data.js';


function App() {
  return (
    <div>
      {/* <FormCategory></FormCategory> */}
    {/* <ProductCard Product={Notebook}></ProductCard> */}
    <Catalogue Products={data}></Catalogue>
    {/* <Product Product={Disco}></Product> */}
    </div>
  );
}

export default App;
