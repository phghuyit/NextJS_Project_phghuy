export function addCart(cart,item){
    if(cart.some((itemCart)=>{
        return itemCart.id===item.id
    })){
        return cart.map((itemCart)=>(itemCart.id===item.id)?{...itemCart,quantity: itemCart.quantity+1}:itemCart)
        }
        else{
            return [...cart,{
            ...item, quantity:1
        }]
        }
    }
    
export function updatequantity(cart,productId,newQty){
    return cart.map(item=>item.id===productId?{...item,quantity: newQty<1?1:newQty}:item);
}

export function removeItem(cart,productId){
    return cart.filter(item=>item.id!==productId)
}

export function getTotalPrice(cart){
    let sum=0;
    cart.forEach(item => {
        sum+=item.price*item.quantity;
    });
    return sum;
}