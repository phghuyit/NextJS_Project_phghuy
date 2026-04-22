import axiosClient from "@/lib/axiosClient";

export default function createCrudService(basePath, pageSizePath = null) {
  return {
    getAll() {
      return axiosClient.get(basePath);
    },

    async getByPageSize(params = {}) {
      if (!pageSizePath) {
        return axiosClient.get(basePath, { params });
      }
      return axiosClient.get(pageSizePath, { params });
    },

    getById(id) {
      return axiosClient.get(`${basePath}/${id}`);
    },

    create(data) {
      return axiosClient.post(basePath, data);
    },

    async update(id, data) {
      if (data instanceof FormData) {
        data.append("_method", "PUT");
        return axiosClient.post(`${basePath}/${id}`, data);
      }
      return axiosClient.put(`${basePath}/${id}`, data);
    },

    delete(id) {
      return axiosClient.delete(`${basePath}/${id}`);
    },
  };
}
