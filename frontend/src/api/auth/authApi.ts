import apiClient from "../apiClient.ts";
import type { ApiResponse } from "../config.ts";

const authApi = {
  me<TResponse>(): Promise<ApiResponse<TResponse>> {
    return apiClient.get<TResponse>("/me");
  },
  login<TResponse, TBody>(data: TBody): Promise<ApiResponse<TResponse>> {
    return apiClient.post<TResponse, TBody>("/login", data);
  },
  register<TResponse, TBody>(data: TBody): Promise<ApiResponse<TResponse>> {
    return apiClient.post<TResponse, TBody>("/register", data);
  },
  logout<TResponse>(): Promise<ApiResponse<TResponse>> {
    return apiClient.post<TResponse>("/logout");
  },
};

export { authApi };
