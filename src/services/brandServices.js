import axiosClient from "@/lib/axiosClient";

export function getBrandByID(id){
    return axiosClient.get(`/brandName/${id}`);
}

export function getBrandAll(){
    return axiosClient.get(`/brands`);
}