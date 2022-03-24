import React, { useEffect, useState } from 'react';
import { addToDb, getFromLocal } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import('./Shop.css')


const Shop = () => {
    const [products ,setProducts] = useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(res=>res.json())
        .then(data=>setProducts(data))
       
    },[])

    useEffect(()=>{
        const localObj = getFromLocal();
        const newArray = []
        for(const id in localObj){
            const addedProduct = products.find(x => x.id === id);
            if(addedProduct){
                newArray.push(addedProduct)
            }
        }
        setCart(newArray)
    },[products])
    const [cart ,setCart] = useState([])
    // unidirectional chaining , function reference diye function re call
    const Funhandle = (data)=>{
      const newArr = [...cart , data];
      setCart(newArr);
      addToDb(data.id);
    }
   
    return (
        <div className='grandParent'>
            <div className='parent'>
            {
            products.map(x=><Product function={Funhandle} object={x} key={x.id}> </Product>)
            }
            </div>
            <div className='summery'>
               <Cart property={cart}></Cart>
                
                
            </div>
        </div>

    );
};

const Product = (props)=>{
const {name, price , id ,img , seller ,ratings} = props.object;
 const fuction = props.function;
    return (
        <div className='product'>

            <img src={img}></img>
            <div className="content">
                <h4>{name}</h4>
                <p>price : {price}</p>
            </div>
            <div>
                <p>Manufecturer : {seller}</p>
                <p>rating : {ratings}</p>
                <p></p>
            </div>
            {/* this function is not defined here .. get here by props provprty */}
            <button onClick={()=>fuction(props.object)} className='btn'>Add to cart</button>
        </div>
    )

}



export default Shop;