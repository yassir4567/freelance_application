import apiClient from "../apiClient";

const projectApi = {
  getBrowseProjects<TResponse = unknown>(query: string) {
    const url = query
      ? `/freelancer/projects?${query}`
      : "/freelancer/projects";
    return apiClient.get<TResponse>(url);
  },
  getBrowseProjectDetail<TResponse = unknown>(id: string) {
    return apiClient.get<TResponse>(`/browse-projects/${id}`);
  },
  getClientProjects<TResponse = unknown>(query: string) {
    const url = query ? `/client/projects?${query}` : "/client/projects";
    return apiClient.get<TResponse>(url);
  },
  getClientProjectDetail<TResponse = unknown>(id: string) {
    return apiClient.get<TResponse>(`/client/projects/${id}`);
  },
  postProject<TResponse = unknown, TBody = unknown>(data: TBody) {
    return apiClient.post<TResponse, TBody>("/client/create-project", data);
  },
};

export { projectApi };
