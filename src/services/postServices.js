import createCrudService from "@/services/createCrudService";

const postServices = createCrudService("/posts", "/postsByPageSize");

export default postServices;
