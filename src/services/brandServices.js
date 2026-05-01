import axiosClient from "@/lib/axiosClient";

export async function getBrandsByPageSize(params = {}) {
    const res = await axiosClient.get("/brandsByPageSize", { params });
    return res;
}
export function getBrandById(id) {
    return axiosClient.get(`/brands/${id}`);
}
export function getBrandByID(id) {
    return getBrandById(id);
}
export function getActiveBrands() {
    return axiosClient.get("/activeBrands");
}
export function storeBrand(data) {
    return axiosClient.post("/brands", data);
}
export async function updateBrand(id, data) {
    if (data instanceof FormData) {
        data.append("_method", "PUT");
        return axiosClient.post(`/brands/${id}`, data);
    }
    return axiosClient.put(`/brands/${id}`, data);
}
export function softDeleteBrand(id) {
    return axiosClient.delete(`/softDeleteBrand/${id}`);
}
export function forceDeleteBrand(id) {
    return axiosClient.delete(`/forceDeleteBrand/${id}`);
}

const brandService = {
    getBrandsByPageSize,
    getBrandById,
    getBrandByID,
    getActiveBrands,
    storeBrand,
    updateBrand,
    softDeleteBrand,
    forceDeleteBrand,
    getByPageSize: getBrandsByPageSize,
    getById: getBrandById,
    create: storeBrand,
    update: updateBrand,
    delete: softDeleteBrand
};

export default brandService;
