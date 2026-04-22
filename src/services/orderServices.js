import createCrudService from "@/services/createCrudService";

const orderServices = createCrudService("/orders", "/ordersByPageSize");

export default orderServices;
