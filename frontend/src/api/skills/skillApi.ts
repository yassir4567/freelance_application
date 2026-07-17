import apiClient from "../apiClient";

const skillApi = {
  getSkills<TResponse>() {
    return apiClient.get<TResponse>("/skills");
  },
  getCategorySkills<TResponse>() {
    return apiClient.get<TResponse>("/admin/skills");
  },
  addSkills<TResponse, TBody>(data: TBody) {
    return apiClient.post<TResponse, TBody>("/admin/skills", data);
  },
};

export { skillApi };
