import apiClient from "../apiClient";

const deliverableApi = {
  accept(id) {
    return apiClient.put(`/deliverables/${id}/accept`);
  },
  submit(id, data) {
    return apiClient.put(`/deliverables/${id}/submit`, data);
  },
  revision(id) {
    return apiClient.put(`/deliverables/${id}/request-revision`);
  },
};

export {deliverableApi}