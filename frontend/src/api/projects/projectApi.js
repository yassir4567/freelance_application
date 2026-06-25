import apiClient from "../apiClient";

const projectApi = {
  getBrowseProjects(query) {
    const url = query ? `/freelancer/projects?${query}` : "/freelancer/projects";
    return apiClient.get(url);
  },
  getBrowseProjectDetail(id) {
    return apiClient.get(`/browse-projects/${id}`);
  },
  getClientProjects(query) {
    const url = query ? `/client/projects?${query}` : "/client/projects";
    return apiClient.get(url);
  },
  getClientProjectDetail(id) {
    return apiClient.get(`/client/projects/${id}`);
  },
  postProject(data) {
    return apiClient.post("/client/create-project", data);
  },
};

export { projectApi };
