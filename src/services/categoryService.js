import axiosClient from "../lib/axiosClient.js";
const categoryServices = {
    getAll(){
        return axiosClient.get("/categories");
    },
    getCatById(id){
        return axiosClient.get(`/showById/${id}`);
    },
    createCategory(data){
        return axiosClient.post("/categories",data);
    }
    
};

export default categoryServices;