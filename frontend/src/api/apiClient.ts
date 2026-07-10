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
  get<TReponse = unknown>(endpoint: string): Promise<ApiResponse<TReponse>> {
    return request<TReponse>(endpoint, {
      method: "GET",
    });
  },
  post<TReponse = unknown, TBody = unknown>(
    endpoint: string,
    data?: TBody | FormData,
  ) {
    return request<TReponse>(endpoint, {
      method: "POST",
      ...buildBody(data),
    });
  },
  put<TReponse = unknown, TBody = unknown>(
    endpoint: string,
    data?: TBody | FormData,
  ) {
    return request<TReponse>(endpoint, {
      method: "PUT",
      ...buildBody(data),
    });
  },
  patch<TReponse = unknown, TBody = unknown>(
    endpoint: string,
    data = undefined,
  ) {
    return request<TReponse>(endpoint, {
      method: "PATCH",
      ...buildBody(data),
    });
  },
  delete<TReponse = unknown>(endpoint: string) {
    return request<TReponse>(endpoint, {
      method: "DELETE",
    });
  },
};

export default apiClient;
