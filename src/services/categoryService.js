import axiosClient from "../lib/axiosClient.js";
const categoryServices = {
    getAll(){
        return axiosClient.get("/categories");
    },
    async getCateByPageSize(params={}){
        const res = await axiosClient.get("/categoriesByPageSize",{params});
        return res.data;
    },
    getCatById(id){
        return axiosClient.get(`/showById/${id}`);
    },
    createCategory(data){
        return axiosClient.post("/categories",data);
    }
    
};

export default categoryServices;