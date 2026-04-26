import axiosClient from "@/lib/axiosClient";
export const getOrder = async () => {
        const response = await axiosClient.get("/orders");
        return response.data; 
};