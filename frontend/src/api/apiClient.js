import { request } from "./config";

const apiClient = {
  get(endpoint) {
    return request(endpoint, {
      method: "GET",
    });
  },
  post(endpoint, data = undefined) {
    return request(endpoint, {
      method: "POST",
      ...(data !== undefined && {
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
    });
  },
  put(endpoint, data = undefined) {
    return request(endpoint, {
      method: "PUT",
      ...(data !== undefined && {
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
    });
  },
  patch(endpoint, data = undefined) {
    return request(endpoint, {
      method: "PATCH",
      ...(data !== undefined && {
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
    });
  },
  delete(endpoint, data) {
    return request(endpoint, {
      method: "DELETE",
    });
  },
};

export default apiClient;
