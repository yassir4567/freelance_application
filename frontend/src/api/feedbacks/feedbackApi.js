import apiClient from "../apiClient";

const feedbackApi = {
  leave(contractId, data) {
    return apiClient.post(`/leave-feedback/${contractId}`, data);
  },
};

export { feedbackApi };
