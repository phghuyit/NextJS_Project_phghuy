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