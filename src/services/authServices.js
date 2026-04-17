import axiosClient from "@/lib/axiosClient";
export async function register(data){
    try{
        const response = await axiosClient.post("auth/local/register",data,{
            headers:{
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        });
        return response.data;
    }catch(err){
        throw err;
    }
} 

export async function login(data){
    return axiosClient.post("/auth/local", data);
}

export async function loginAdmin(data) {
    
    return axiosClient.post("/admin/login",data);
}