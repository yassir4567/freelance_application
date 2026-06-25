import apiClient from "../apiClient";

const categoryApi = {
  getCategories() {
    return apiClient.get("/categories");
  },
  getCategoriesForAdmin() {
    return apiClient.get("/admin/categories");
  },
  addCategory(data) {
    return apiClient.post("/admin/categories", data);
  },
};

export { categoryApi };
