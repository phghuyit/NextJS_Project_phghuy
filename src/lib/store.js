import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '@/lib/features/cart/cartSlice.js'

export const makeStore =()=>{
    return configureStore({
        reducer:{
        cart: cartReducer,
    },
    });
};