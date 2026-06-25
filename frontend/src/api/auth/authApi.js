import apiClient from "../apiClient";

const authApi = {
  me() {
    return apiClient.get("/me");
  },
  login(data) {
    return apiClient.post("/login", data);
  },
  register(data) {
    return apiClient.post("/register", data);
  },
  logout() {
    return apiClient.post("/logout");
  },
};

export { authApi };
