import apiClient from "../apiClient";

const profileApi = {
  update(role, payload) {
    payload.set("_method", "PUT");
    return apiClient.post(`/${role}/update-profile`, payload);
  },
};

export { profileApi };
