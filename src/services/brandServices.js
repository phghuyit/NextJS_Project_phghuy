import axiosClient from "@/lib/axiosClient";

export async function getBrandsByPageSize(params = {}) {
    const res = await axiosClient.get("/brandsByPageSize", { params });
    return res;
}
<<<<<<< HEAD

export async function getTrashedBrandsByPageSize(params = {}) {
    const res = await axiosClient.get("/trashedBrandsByPageSize", { params });
    return res;
}

export function getBrandById(id) {
    return axiosClient.get(`/brands/${id}`);
}

export function getBrandNameByID(id) {
    return axiosClient.get(`/brandName/${id}`);
}

export function getBrandAll() {
    return axiosClient.get("/brands");
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

export function restoreBrand(id) {
    return axiosClient.patch(`/brands/${id}/restore`);
}

const brandService = {
    getBrandsByPageSize,
    getBrandNameByID,
    getBrandAll,
=======
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
>>>>>>> a296bc6d69093b06f95be3b4f1a1f590c2792f99
    getActiveBrands,
    storeBrand,
    updateBrand,
    softDeleteBrand,
    forceDeleteBrand,
<<<<<<< HEAD
    restoreBrand,
    getByPageSize: getBrandsByPageSize,
    getTrashedByPageSize: getTrashedBrandsByPageSize,
=======
    getByPageSize: getBrandsByPageSize,
    getById: getBrandById,
>>>>>>> a296bc6d69093b06f95be3b4f1a1f590c2792f99
    create: storeBrand,
    update: updateBrand,
    delete: softDeleteBrand
};

export default brandService;
