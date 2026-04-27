import axiosClient from "@/lib/axiosClient";

export function getAll() {
  return axiosClient.get("/users");
}

export async function getByPageSize(params = {}) {
  return axiosClient.get("/usersByPageSize", { params });
}

export function getById(id) {
  return axiosClient.get(`/users/${id}`);
}

export function create(data) {
  return axiosClient.post("/users", data);
}

export async function update(id, data) {
  if (data instanceof FormData) {
    data.append("_method", "PUT");
    return axiosClient.post(`/users/${id}`, data);
  }
  return axiosClient.put(`/users/${id}`, data);
}

export function deleteUser(id) {
  return axiosClient.delete(`/users/${id}`);
}

const userServices = {
  getAll,
  getByPageSize,
  getById,
  create,
  update,
  delete: deleteUser,
};

export default userServices;
