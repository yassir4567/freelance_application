import apiClient from "../apiClient";

const proposalApi = {
  accept<TResponse>(projectId: string, proposalId: number) {
    return apiClient.put<TResponse>(
      `/client/projects/${projectId}/proposals/${proposalId}/accept`,
    );
  },
  reject<TResponse>(projectId: string, proposalId: number) {
    return apiClient.put<TResponse>(
      `/client/projects/${projectId}/proposals/${proposalId}/reject`,
    );
  },
  send<TResponse, TBody>(projectId: string, data: TBody) {
    return apiClient.post<TResponse, TBody>(
      `/projects/${projectId}/send-proposal`,
      data,
    );
  },
  getClientProjectProposals<TResponse>(id: string) {
    return apiClient.get<TResponse>(`/client/projects/${id}/proposals`);
  },
  getFreelancerProposals<TResponse>(query: string) {
    const url = query
      ? `/freelancer/proposals?${query}`
      : "/freelancer/proposals";
    return apiClient.get<TResponse>(url);
  },
};

export { proposalApi };
