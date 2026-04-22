import createCrudService from "@/services/createCrudService";

const menuServices = createCrudService("/menus", "/menusByPageSize");

export default menuServices;
