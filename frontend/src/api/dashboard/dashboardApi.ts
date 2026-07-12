import apiClient from "../apiClient";
import type { ApiResponse } from "../config";

const dashboardApi = {
  getDashboardData<TResponse>(role: string): Promise<ApiResponse<TResponse>> {
    return apiClient.get<TResponse>(`/${role}/dashboard`);
  },
};

export { dashboardApi };
