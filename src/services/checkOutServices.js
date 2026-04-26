import axiosClient from "@/lib/axiosClient";

export default function storeOrder(data){
    return axiosClient.post("/saveOrder",data);
};