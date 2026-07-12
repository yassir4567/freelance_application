import { request, type ApiResponse } from "./config.ts";

function buildBody(data: unknown): Pick<RequestInit, "body"> {
  if (data === undefined) {
    return {};
  }

  return {
    body: data instanceof FormData ? data : JSON.stringify(data),
  };
}

const apiClient = {
  get<TResponse = unknown>(endpoint: string): Promise<ApiResponse<TResponse>> {
    return request<TResponse>(endpoint, {
      method: "GET",
    });
  },
  post<TResponse = unknown, TBody = unknown>(
    endpoint: string,
    data?: TBody | FormData,
  ) {
    return request<TResponse>(endpoint, {
      method: "POST",
      ...buildBody(data),
    });
  },
  put<TResponse = unknown, TBody = unknown>(
    endpoint: string,
    data?: TBody | FormData,
  ) {
    return request<TResponse>(endpoint, {
      method: "PUT",
      ...buildBody(data),
    });
  },
  patch<TResponse = unknown, TBody = unknown>(
    endpoint: string,
    data = undefined,
  ) {
    return request<TResponse>(endpoint, {
      method: "PATCH",
      ...buildBody(data),
    });
  },
  delete<TResponse = unknown>(endpoint: string) {
    return request<TResponse>(endpoint, {
      method: "DELETE",
    });
  },
};

export default apiClient;
