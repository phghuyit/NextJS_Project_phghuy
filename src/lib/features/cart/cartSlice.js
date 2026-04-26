import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[],
    totalQty: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCart(state,action){
            return action.payload;
        },
        addToCart(state,action){
            const newItem = action.payload;
            const existingItem=state.items.find(item=>item.id===newItem.id);

            state.totalQty++;
            state.totalAmount+=newItem.price;

            if(!existingItem){                                                                                                                                    
                state.items.push({
                    ...newItem,
                    qty:1,
                    totalPrice: newItem.price
                });
            }else{
                existingItem.qty++;
                existingItem.totalPrice+= newItem.price;
            }
        },
        updateQuantity(state,action){
            const data=action.payload;
            const itemUpdate = state.items.find(item=>item.id===data.id);
            if(itemUpdate){
                const diff = data.quantity - itemUpdate.qty;
                itemUpdate.qty = data.quantity;
                state.totalAmount += (itemUpdate.price * diff);
                state.totalQty += diff;
                itemUpdate.totalPrice = itemUpdate.qty * itemUpdate.price;
            }
        },
        removeFromCart(state,action){
            const id = action.payload;
            const item= state.items.find(item=>item.id===id);
            if(item){
                state.totalQty -= item.qty;
                state.totalAmount -= item.totalPrice;
                state.items=state.items.filter(item=>item.id!==id)
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQty = 0;
            state.totalAmount = 0;
        }
    },
});

export const {addToCart,removeFromCart,updateQuantity,setCart,clearCart} = cartSlice.actions;

export default cartSlice.reducer;