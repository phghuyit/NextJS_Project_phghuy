"use client";

import { Provider } from "react-redux";
import { makeStore } from "./store";
import { useEffect, useRef } from "react";
import { setCart } from "./features/cart/cartSlice";

export default function StoreProvider({children}){
    const storeRef = useRef();

    if(!storeRef.current){
        storeRef.current=makeStore();
    }

    useEffect(()=>{
        const savedCart = localStorage.getItem("cart");
        if(savedCart){
            try{
                const parsedCart = JSON.parse(savedCart);
                storeRef.current.dispatch(setCart(parsedCart));
            }catch(err){
                console.error("Lỗi nạp giỏ hàng:", err);
            }
        }
        const unsubscribe = storeRef.current.subscribe(() => {
            const state = storeRef.current.getState();
            localStorage.setItem("cart", JSON.stringify(state.cart));
        });
        return () => unsubscribe();
    },[])

    storeRef.current.subscribe(()=>{
        const state = storeRef.current.getState();
        localStorage.setItem("cart", JSON.stringify(state.cart));
    })
    return <Provider store={storeRef.current}>{children}</Provider>;
}