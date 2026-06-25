import apiClient from "../apiClient";

const skillApi = {
  getSkills() {
    return apiClient.get("/skills");
  },
  getCategorySkills() {
    return apiClient.get("/admin/skills");
  },
  addSkills(data) {
    return apiClient.post("/admin/skills", data);
  },
};

export { skillApi };
