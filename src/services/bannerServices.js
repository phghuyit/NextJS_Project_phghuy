import createCrudService from "@/services/createCrudService";

const bannerServices = createCrudService("/banners", "/bannersByPageSize");

export default bannerServices;
