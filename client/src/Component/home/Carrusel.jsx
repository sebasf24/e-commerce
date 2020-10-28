import React,{useEffect} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from '../ProductCard/ProductCard.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {mostrarProductos} from "../../actions/products.js"


export default function Carrusel(){

    const productsl = useSelector(state=>state.products);
console.log(productsl)
 let products = productsl.products;

 const dispatch=useDispatch();
  useEffect(()=>{
        dispatch(mostrarProductos())
},[])


    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 4 
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 3 
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          slidesToSlide: 2 
        }
      };
    return (
        <div style={{marginLeft: 30}}>
          <div>
            <h1>Nuestros Productos 5 estrellas!</h1>
          </div>
            <Carousel
            additionalTransfrom={0}
            minimumTouchDrag={80}
  swipeable={true}
  draggable={true}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlay={true}
  autoPlaySpeed={5000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={600}
  containerClass="carousel-container"
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
  customTransition="transform 800ms ease-in-out"
>
{products.map(product => {
                    return (<ProductCard Product={product} />)})}
</Carousel>;
        </div>
    )
}