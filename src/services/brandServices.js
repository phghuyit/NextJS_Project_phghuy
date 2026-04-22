import createCrudService from "@/services/createCrudService";

const brandServices = createCrudService("/brands", "/brandsByPageSize");

export default brandServices;
