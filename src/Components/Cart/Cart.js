import React from 'react';
import('./Cart.css')
const Cart = (props)=> {
   const cartArray = props.property;
   let totalCost = 0;
   let totalShipping = 0;

   for (const product of cartArray){
       totalCost =totalCost + product.price;
       totalShipping = totalShipping + product.shipping
   }
    return (
        <div className='cart'>
             <h1>product summery</h1>
                <p>clicked product : {cartArray.length}</p>
                <p>total cost : {totalCost}</p>
                <p>total shipping: {totalShipping}</p>
        </div>
    );
};

export default Cart;