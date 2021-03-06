import React from 'react';
import('./Cart.css')
const Cart = (props)=> {
   const cartArray = props.property;
   
   let totalCost = 0;
   let totalShipping = 0;
   let TotalQuantity = 0

   for (const product of cartArray){
       TotalQuantity = TotalQuantity + product.quantity;
       totalCost =totalCost + product.price * product.quantity;
       totalShipping = totalShipping + product.shipping
   }

   const tax = (totalCost * .1).toFixed(2);
   const Grand = parseFloat(totalCost) + parseFloat(tax) ;
    return (
        <div className='cart'>
             <h1>product summery</h1>
                <p>selected items: {TotalQuantity}</p>
                <p>total cost : {totalCost}</p>
                <p>total shipping: {totalShipping}</p>
                <p>tax :{tax} </p>
                <p>grand total :{parseFloat(Grand)} </p>
        </div>
    );
};

export default Cart;