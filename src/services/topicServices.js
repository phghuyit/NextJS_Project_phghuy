import createCrudService from "@/services/createCrudService";

const topicServices = createCrudService("/topics", "/topicsByPageSize");

export default topicServices;
