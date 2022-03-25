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
            // .find alwaya returns 1st matched element , not array like map n filter
            // here addedproduct is an object . cz .find will return an object
            const addedProduct = products.find(x => x.id === id);
          
            if(addedProduct){
                const quantity = localObj[id];
                // now set quantity as a property of  addedprorduct  object 
                addedProduct.quantity = quantity
                newArray.push(addedProduct)
            }
        }
        // console.log(newArray)
        setCart(newArray)
    },[products])


   
// setcart is in neutral zone . bor useffect and usestate are using it 
    
   const [cart ,setCart] = useState([])
    
    // unidirectional chaining , function reference diye function re call
    const Funhandle = (data)=>{
      let newArr = [];
      const exists = cart.find(x=>x.id===data.id);
      if(!exists){
          data.quantity =1;
         newArr = [...cart , data];
      }
      else{
          const rest = cart.filter(x=>x.id!==data.id);
          data.quantity = data.quantity+1;
          newArr = [...rest , data]
      }
     
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