import axiosClient from "../lib/axiosClient.js";
const brandServices = {
    getAll(){
        return axiosClient.get("/brand");
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