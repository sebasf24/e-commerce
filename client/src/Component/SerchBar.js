import React, { useState, useEffect, useRef } from 'react';

const SerchBar = () => {
    const [serch, setSerch] = useState("");

    const myRef = useRef(null);

    function handlerSerch(){
        let valor = myRef.current.value;
        console.log(valor);
        setSerch(valor);
    }

    function handlerSubmit(e){
        e.preventDefault();
        let valor = myRef.current.value;
        console.log(valor);
    }

    return(
        <form onSubmit={handlerSubmit}>
            <input type="text" ref={myRef} onChange={handlerSerch}/>
            <button type="submit">Buscar</button>
        </form>
      )
}


/* const api = [
    name: 
    type: 
    description: 
    price:
    stock:
    img: 
] */

export default SerchBar;