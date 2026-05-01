"use client"
import { useContext,createContext,useState,useEffect } from "react";
import Cookies from "js-cookie";

const AdminContext = createContext();

export function useAdminAuth(){
    return useContext(AdminContext);
}

export function AdminAuthProvider({children}){
    const [admin,setAdmin]=useState(null);
    useEffect(()=>{
        const stored = Cookies.get('adminUser');
        if(stored) { 
            try {
                setAdmin(JSON.parse(stored));
            } catch (error) {
                setAdmin(stored);
            }
        }
    },[])
    
    function loginAdmin(user,token){
        Cookies.set('adminUser', JSON.stringify(user));
        Cookies.set('adminToken',token,{
            expires:7,
            secure:true,
            sameSite:'strict',
            path:'/admin'
        })
        setAdmin(user);
    }
    function logoutAdmin(){
        Cookies.remove('adminUser');
        Cookies.remove('adminToken', { path: '/admin' });
        setAdmin(null);
    }
    return (
        <AdminContext.Provider value={{admin,loginAdmin, logoutAdmin}}>
            {children}
        </AdminContext.Provider>
    );
}
