import axiosClient from "@/lib/axiosClient";

export async function getMenusByPageSize(params = {}) {
    const res = await axiosClient.get("/menusByPageSize", { params });
    return res;
}
export function getMenuById(id) {
    return axiosClient.get(`/menus/${id}`);
}
export function getActiveMenus() {
    return axiosClient.get("/activeMenus");
}
export function getMenuByPosition(pos = "mainmenu") {
    return axiosClient.get(`/menus?position=${pos}`);
}
export function storeMenu(data) {
    return axiosClient.post("/menus", data);
}
export function updateMenu(id, data) {
    return axiosClient.put(`/menus/${id}`, data);
}
export async function getTrashedMenusByPageSize(params = {}) {
    const res = await axiosClient.get("/trashedMenusByPageSize", { params });
    return res;
}
export function restoreMenu(id) {
    return axiosClient.patch(`/menus/${id}/restore`);
}
export function forceDeleteMenu(id) {
    return axiosClient.delete(`/forceDeleteMenu/${id}`);
}

export function softDeleteMenu(id) {
    return axiosClient.delete(`/softDeleteMenu/${id}`);
}

const menuService = {
    getMenusByPageSize,
    getMenuById,
    getActiveMenus,
    getMenuByPosition,
    storeMenu,
    updateMenu,
    softDeleteMenu,
    forceDeleteMenu,
    getTrashedByPageSize: getTrashedMenusByPageSize,
    restore: restoreMenu,
    destroy: forceDeleteMenu,
    getByPageSize: getMenusByPageSize,
    getById: getMenuById,
    create: storeMenu,
    update: updateMenu,
    delete: softDeleteMenu
};

export function getByPageSize(params = {}){
  return axiosClient.get(`/menusByPageSize/`,{params});
};

export function getMenuAll(){
    return axiosClient.get(`/menus/`);
} 

export default menuService;
