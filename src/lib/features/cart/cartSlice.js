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
            const loadedState = action.payload || {};
            const loadedItems = loadedState.items || [];
            
            let calcQty = 0;
            let calcAmount = 0;
            
            state.items = loadedItems.map(item => {
                const currentPrice = item.is_on_sale == 1 ? item.sale_price : item.price;
                const qty = item.qty || 1;
                calcQty += qty;
                calcAmount += (currentPrice * qty);
                
                return {
                    ...item,
                    qty: qty,
                    totalPrice: currentPrice * qty
                };
            });
            
            state.totalQty = calcQty;
            state.totalAmount = calcAmount;
        },
        addToCart(state,action){
            const newItem = action.payload;
            const existingItem=state.items.find(item=>item.id===newItem.id);
            const currentPrice =newItem.is_on_sale == 1 ? newItem.sale_price : newItem.price;

            state.totalQty++;
            state.totalAmount += currentPrice;
            if(!existingItem){                                                                                                                                    
                state.items.push({
                    ...newItem,
                    qty:1,
                    totalPrice: currentPrice
                });
            }else{
                existingItem.qty++;
                existingItem.totalPrice += currentPrice;
            }
        },
        updateQuantity(state,action){
            const data=action.payload;
            const itemUpdate = state.items.find(item=>item.id===data.id);
            if(itemUpdate){
                const currentPrice =itemUpdate.is_on_sale == 1 ? itemUpdate.sale_price : itemUpdate.price;
                const diff = data.quantity - itemUpdate.qty;
                itemUpdate.qty = data.quantity;
                state.totalAmount += (currentPrice * diff);
                state.totalQty += diff;
                itemUpdate.totalPrice = itemUpdate.qty * currentPrice;
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