<<<<<<< HEAD
import axiosClient from "../lib/axiosClient.js";
const categoryServices = {
    getAll(){
        return axiosClient.get("/categories");
    },
    async getCateByPageSize(params={}){
        const res = await axiosClient.get("/categoriesByPageSize",{params});
        return res;
    },
    getCatById(id){
        return axiosClient.get(`/showById/${id}`);
    },
    getCatBySlug(slug){
        return axiosClient.get(`/showBySlug/${slug}`);
    },
    createCategory(data){
        return axiosClient.post("/categories",data);
    },
    async updateCat(id, data){
        if (data instanceof FormData) {
            data.append('_method', 'PUT');
            return axiosClient.put(`/categories/${id}`, data);
        }
        return axiosClient.put(`/categories/${id}`, data);
    },
    deleteCategory(id){
        return axiosClient.delete(`/categories/${id}`)
    },
    
    async getTrashedCategories(params={}){
        const res = await axiosClient.get("/trashedCategoriesByPageSize", {params});
        return res?.data || res;
    },
    restoreCategory(id){
        return axiosClient.patch(`/categories/${id}/restore`);
    },
    forceDeleteCategory(id){
        return axiosClient.delete(`/categories/${id}/force`);
    }
};
=======
import axiosClient from "@/lib/axiosClient";
>>>>>>> a296bc6d69093b06f95be3b4f1a1f590c2792f99

export function getCategories() {
    return axiosClient.get("/categories");
}
export function getActiveCategories() {
    return axiosClient.get("/activeCategories");
}
export function getInactiveCategories() {
    return axiosClient.get("/inactiveCategories");
}
export function getNotParentCategories() {
    return axiosClient.get("/notParentCategories");
}
export function getChildCategories(parentId) {
    return axiosClient.get(`/childCategories/${parentId}`);
}
export async function getCategoriesByPageSize(params = {}) {
    const res = await axiosClient.get("/categoriesByPageSize", { params });
    return res;
}
export async function getTrashedCategoriesByPageSize(params = {}) {
    const res = await axiosClient.get("/trashedCategoriesByPageSize", { params });
    return res;
}
export function getParentCategories() {
    return axiosClient.get("/parentCategories");
}
export function getCategoryById(id) {
    return axiosClient.get(`/showById/${id}`);
}
export function getCategoryBySlug(slug) {
    return axiosClient.get(`/showBySlug/${slug}`);
}
export function storeCategory(data) {
    return axiosClient.post("/categories", data);
}
export async function updateCategory(id, data) {
    if (data instanceof FormData) {
        data.append("_method", "PUT");
        return axiosClient.post(`/categories/${id}`, data);
    }
    return axiosClient.put(`/categories/${id}`, data);
}
export function softDeleteCategory(id) {
    return axiosClient.delete(`/categories/${id}`);
}
export function forceDeleteCategory(id) {
    return axiosClient.delete(`/categories/${id}/force`);
}
export function restoreCategory(id) {
    return axiosClient.patch(`/categories/${id}/restore`);
}
export function updateCategoryStatus(id, data) {
    return axiosClient.patch(`/updateStatusCategory/${id}`, data);
}
export function getAll() {
    return getCategories();
}
export async function getCateByPageSize(params = {}) {
    return getCategoriesByPageSize(params);
}
export async function getTrashedCategories(params = {}) {
    return getTrashedCategoriesByPageSize(params);
}
export function getCatById(id) {
    return getCategoryById(id);
}
export function getCatBySlug(slug) {
    return getCategoryBySlug(slug);
}
export function createCategory(data) {
    return storeCategory(data);
}
export async function updateCat(id, data) {
    return updateCategory(id, data);
}
export function deleteCategory(id) {
    return softDeleteCategory(id);
}

const categoryService = {
    getCategories,
    getActiveCategories,
    getInactiveCategories,
    getNotParentCategories,
    getChildCategories,
    getCategoriesByPageSize,
    getTrashedCategoriesByPageSize,
    getParentCategories,
    getCategoryById,
    getCategoryBySlug,
    storeCategory,
    updateCategory,
    softDeleteCategory,
    forceDeleteCategory,
    restoreCategory,
    updateCategoryStatus,
    getAll,
    getCateByPageSize,
    getTrashedCategories,
    getCatById,
    getCatBySlug,
    createCategory,
    updateCat,
    deleteCategory,
    getById: getCategoryById,
    create: storeCategory,
    update: updateCategory,
    delete: softDeleteCategory
};
export default categoryService;
