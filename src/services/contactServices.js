import createCrudService from "@/services/createCrudService";

const contactServices = createCrudService("/contacts", "/contactsByPageSize");

export default contactServices;
