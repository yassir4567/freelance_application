import apiClient from "../apiClient";

const paymentApi = {
  fundDeliverable(id, data) {
    return apiClient.post(`/deliverables/${id}/payments/fund`, data);
  },
};

export { paymentApi };
