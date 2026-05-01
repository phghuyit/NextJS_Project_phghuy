import axiosClient from "@/lib/axiosClient";

export function getProducts() {
    return axiosClient.get("/products");
}
export async function getProductsByPageSize(params = {}) {
    const res = await axiosClient.get("/productsByPageSize", { params });
    return res;
}
export async function getActiveProductsByPageSize(params = {}) {
    const res = await axiosClient.get("/activeProductsByPageSize", { params });
    return res;
}
export async function getProductsByStartLimit(params = {}) {
    const res = await axiosClient.get("/productsByStartLimit", { params });
    return res;
}
export async function getTrashedProductsByPageSize(params = {}) {
    const res = await axiosClient.get("/trashedProductsByPageSize", { params });
    return res;
}
export async function getNewProducts(limit = 4) {
    const res = await axiosClient.get(`/newProducts/${limit}`);
    return res;
}
export async function getSaleProducts(limit = 4) {
    const res = await axiosClient.get(`/saleProducts/${limit}`);
    return res;
}
export async function getHotProducts(limit = 4) {
    const res = await axiosClient.get(`/hotProducts/${limit}`);
    return res;
}
export function getProductById(id) {
    return axiosClient.get(`/products/${id}`);
}
export function getProductBySlug(slug) {
    return axiosClient.get(`/showDetails/${slug}`);
}
export function getProductsByCategoryId(categoryId) {
    return axiosClient.get(`/productsByCategoryId/${categoryId}`);
}
export function getProductsByCategorySlug(slug) {
    return axiosClient.get(`/productsByCategorySlug/${slug}`);
}
export function getProductsByBrandId(brandId) {
    return axiosClient.get(`/productsByBrandId/${brandId}`);
}
export function getProductsByBrandSlug(slug) {
    return axiosClient.get(`/productsByBrandSlug/${slug}`);
}
export function createProduct(data) {
    return axiosClient.post("/products", data);
}
export async function updateProduct(id, data) {
    if (data instanceof FormData) {
        data.append("_method", "PUT");
        return axiosClient.post(`/products/${id}`, data);
    }
    return axiosClient.put(`/products/${id}`, data);
}
export function softDeleteProduct(id) {
    return axiosClient.delete(`/products/${id}`);
}
export function forceDeleteProduct(id) {
    return axiosClient.delete(`/products/${id}/force`);
}
export function updateProductStatus(id, data) {
    return axiosClient.patch(`/updateStatus/${id}`, data);
}

const productService = {
    getProducts, getProductsByPageSize, getActiveProductsByPageSize,
    getProductsByStartLimit, getTrashedProductsByPageSize,
    getNewProducts, getSaleProducts, getHotProducts,
    getProductById, getProductBySlug, getProductsByCategoryId,
    getProductsByCategorySlug, getProductsByBrandId, getProductsByBrandSlug,
    createProduct, updateProduct, softDeleteProduct, forceDeleteProduct, updateProductStatus
};
export default productService;