"use client"
import { useContext,createContext,useState,useEffect } from "react";
import Cookies from "js-cookie";
const AdminContext = createContext();

export function AdminAuthProvider({children}){
    const [admin,setAdmin]=useState({});
    useEffect(()=>{
        const stored = Cookies?.get();
        if(stored) { setAdmin(stored);}
    },[])

    function loginAdmin(user,token){
        Cookies.set('user',user);
        Cookies.set('adminToken',token,{
            expires:7,
            secure:true,
            sameSite:'strict',
            path:'/admin'
        })
        setAdmin(user);
    }
    function logoutAdmin(){
        Cookies.remove('user');
        Cookies.remove('token')
        setAdmin(null);
    }
    return (
        <AdminContext.Provider value={{admin,loginAdmin, logoutAdmin}}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAuth(){
    return useContext(AdminContext);
}