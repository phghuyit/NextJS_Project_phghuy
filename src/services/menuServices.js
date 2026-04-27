import axiosClient from "@/lib/axiosClient";
import createCrudService from "@/services/createCrudService";

const menuServices = createCrudService("/menus", "/menusByPageSize");

export function getMenuByPosition(pos="mainmenu"){
  return axiosClient.get(`/menus?position=${pos}`);
};

export default menuServices;
