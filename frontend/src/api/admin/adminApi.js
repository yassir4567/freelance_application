import apiClient from "../apiClient";

const adminApi = {
  getUsers(query) {
    console.log(query);

    const url = query ? `/admin/users?${query}` : `/admin/users`;

    return apiClient.get(url);
  },
  getUserDetails(userId) {
    return apiClient.get(`/admin/users/${userId}`);
  },
};

export { adminApi };
