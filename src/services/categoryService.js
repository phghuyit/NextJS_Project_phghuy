import axiosClient from "@/lib/axiosClient";

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
