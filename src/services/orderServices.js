import axiosClient from "@/lib/axiosClient";

export function getOrders() {
    return axiosClient.get("/orders");
}
export async function getOrdersByPageSize(params = {}) {
    const res = await axiosClient.get("/ordersByPageSize", { params });
    return res;
}
export function getOrdersByUser(userId) {
    return axiosClient.get(`/ordersByUser/${userId}`);
}
export function getOrderById(id) {
    return axiosClient.get(`/orders/${id}`);
}
export function saveOrder(data) {
    return axiosClient.post("/saveOrder", data);
}
export function updateOrder(id, data) {
    return axiosClient.put(`/orders/${id}`, data);
}
export function deleteOrder(id) {
    return axiosClient.delete(`/orders/${id}`);
}
export function updateOrderStatus(id, data) {
    return axiosClient.patch(`/updateStatusOrder/${id}`, data);
}
export function getOrderDetailsByOrderId(orderId) {
    return axiosClient.get(`/getByOrderId/${orderId}`);
}
export function getOrderByUser(userId) {
    return getOrdersByUser(userId);
}
export function getByOrderId(orderId) {
    return getOrderDetailsByOrderId(orderId);
}
export function getBriefOrder(orderId) {
    return getOrderById(orderId);
}
export function storeOrder(data) {
    return saveOrder(data);
}

const orderService = {
    getOrders,
    getOrdersByPageSize,
    getOrdersByUser,
    getOrderById,
    saveOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
    getOrderDetailsByOrderId,
    getOrderByUser,
    getByOrderId,
    getBriefOrder,
    storeOrder,
    getByPageSize: getOrdersByPageSize,
    getById: getOrderById,
    create: saveOrder,
    update: updateOrder,
    delete: deleteOrder
};

export default orderService;
