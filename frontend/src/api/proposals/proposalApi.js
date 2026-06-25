import apiClient from "../apiClient";

const proposalApi = {
  accept(projectId, proposalId) {
    return apiClient.put(
      `/client/projects/${projectId}/proposals/${proposalId}/accept`,
    );
  },
  reject(projectId, proposalId) {
    return apiClient.put(
      `/client/projects/${projectId}/proposals/${proposalId}/reject`,
    );
  },
  send(projectId, data) {
    return apiClient.post(`/projects/${projectId}/send-proposal`, data);
  },
  getClientProjectProposals(id) {
    return apiClient.get(`/client/projects/${id}/proposals`);
  },
  getFreelancerProposals(query) {
    const url = query
      ? `/freelancer/proposals?${query}`
      : "/freelancer/proposals";
    return apiClient.get(url);
  },
};

export { proposalApi };
