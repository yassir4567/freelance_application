import apiClient from "../apiClient";

const categoryApi = {
  getCategories<TResponse>() {
    return apiClient.get<TResponse>("/categories");
  },
  getCategoriesForAdmin<TResponse>() {
    return apiClient.get<TResponse>("/admin/categories");
  },
  // any type for now
  addCategory<TResponse, TBody>(data: any) {
    return apiClient.post<TResponse, TBody>("/admin/categories", data);
  },
};

export { categoryApi };
