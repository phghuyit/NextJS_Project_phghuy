"use client"

import{createContext, useContext,useState,useEffect} from "react"

const AuthContext = createContext({});

export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    useEffect(()=>{
        const stored = localStorage.getItem("user");
        if(stored && stored !== "undefined") 
        {
            try {
                setUser(JSON.parse(stored));
            } catch (error) {
                console.error("Failed to parse user from localStorage:", error);
            }
        }
    },[])
    const loginUser = (userData, token)=>{
        localStorage.setItem("user",JSON.stringify(userData));
        localStorage.setItem("accessToken", token);
        setUser(userData);
    }
    const updateUser = (userData)=>{
        localStorage.setItem("user",JSON.stringify(userData));
        setUser(userData);
    }
    const logoutUser = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user,loginUser, updateUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}
