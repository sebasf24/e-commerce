import React from 'react';
import Carrusel from './Carrusel'
import Homecategory from './Homcategory'

export default function Home(){
  return (
    <div>
    <Homecategory/>
    <div class="card-group">
  <div class="card">
   
    <div class="card-body">
      <h5 class="card-title">Metodos de Pago</h5>
      <p class="card-text">Aca podria poner unas imagens de las tarjetas supongo</p>
      
    </div>
  </div>
  <div class="card">
    
    <div class="card-body">
      <h5 class="card-title">Envio Gratis</h5>
      <p class="card-text">dibujito de un camioncito?</p>
      
    </div>
  </div>
  <div class="card">
    
    <div class="card-body">
      <h5 class="card-title">No se me ocurre nada</h5>
      <p class="card-text">blabla bla bla blablabla bla bla</p>
      
    </div>
  </div>
</div>
    <Carrusel/>
    </div>
  )
}