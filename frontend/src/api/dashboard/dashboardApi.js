import apiClient from "../apiClient";

const dashboardApi = {
  getDashboardData(role) {
    return apiClient.get(`/${role}/dashboard`);
  },
};

export {dashboardApi}