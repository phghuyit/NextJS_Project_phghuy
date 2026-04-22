import createCrudService from "@/services/createCrudService";

const userServices = createCrudService("/users", "/usersByPageSize");

export default userServices;
