import axiosClient from "@/lib/axiosClient";
import createCrudService from "@/services/createCrudService";

const menuServices = createCrudService("/menus", "/menusByPageSize");

export function getMenuByPosition(pos="mainmenu"){
  return axiosClient.get(`/menus?position=${pos}`);
};

export function getByPageSize(params = {}){
  return axiosClient.get(`/menusByPageSize/`,{params});
};

export function getMenuById(id){
    return axiosClient.get(`/menus/${id}`);
}

export function getMenuAll(){
    return axiosClient.get(`/menus/`);
} 33  

export function storeMenu(data) {
    return axiosClient.post("/menus", data);
}

export function softDeleteMenu(id) {
    return axiosClient.delete(`/menus/${id}`);
}

export async function updateMenu(id, data) {
    return axiosClient.put(`/menus/${id}`, data);
}

export default menuServices;
