import axiosClient from "@/lib/axiosClient";

export function register(data) {
    return axiosClient.post("/auth/local/register", data);
}

export function login(data) {
    return axiosClient.post("/auth/local", data);
}

export function loginAdmin(data) {
    return axiosClient.post("/admin/login", data);
}

export function logout() {
    return axiosClient.post("/auth/logout");
}

export function getMe() {
    return axiosClient.get("/auth/me");
}

export function updateMe(data) {
    if (data instanceof FormData) {
        data.append("_method", "PUT");
        return axiosClient.post("/auth/me", data);
    }
    return axiosClient.put("/auth/me", data);
}

export function changePassword(data) {
    return axiosClient.post("/auth/change-password", data);
}

export async function getUsersByPageSize(params = {}) {
    const res = await axiosClient.get("/usersByPageSize", { params });
    return res;
}

const authService = {
    register, login, loginAdmin, logout, getMe, updateMe, changePassword, getUsersByPageSize
};

export default authService;