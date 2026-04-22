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
    createCategory(data){
        return axiosClient.post("/categories",data);
    },
    async updateCat(id, data){
        if (data instanceof FormData) {
            data.append('_method', 'PUT');
            return axiosClient.post(`/categories/${id}`, data);
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

export default categoryServices;