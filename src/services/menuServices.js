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
export function softDeleteMenu(id) {
    return axiosClient.delete(`/softDeleteMenu/${id}`);
}
export function forceDeleteMenu(id) {
    return axiosClient.delete(`/forceDeleteMenu/${id}`);
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
    getByPageSize: getMenusByPageSize,
    getById: getMenuById,
    create: storeMenu,
    update: updateMenu,
    delete: softDeleteMenu
};

export default menuService;
