import { request } from "./config";

const apiClient = {
  get(endpoint) {
    return request(endpoint, {
      method: "GET",
    });
  },
  post(endpoint, data) {
    return request(endpoint, {
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  },
  put(endpoint, data) {
    return request(endpoint, {
      method: "PUT",
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  },
  patch(endpoint, data) {
    return request(endpoint, {
      method: "PATCH",
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  },
  delete(endpoint, data) {
    return request(endpoint, {
      method: "DELETE",
    });
  },
};

export default apiClient;
