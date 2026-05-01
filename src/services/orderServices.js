import axiosClient from "@/lib/axiosClient";
import createCrudService from "@/services/createCrudService";

const orderServices = createCrudService("/orders", "/ordersByPageSize");

export function getOrderByUser(userId){
    return axiosClient.get(`/ordersByUser/${userId}`);
};

export function getByOrderId(orderId){
    return axiosClient.get(`/getByOrderId/${orderId}`);
};

export function getBriefOrder(orderId){
    return axiosClient.get(`/orders/${orderId}`);
}

export const storeOrder = async (data) => {
    return axiosClient.post("/saveOrder",data);
};

export const updateStatusOrder = async (id,data) => {
    return axiosClient.patch(`/updateStatusOrder/${id}`,data);
};

export default orderServices;
