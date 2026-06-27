import apiClient from "../apiClient";

const contractApi = {
  getContracts(role, filters) {
    const url = filters
      ? `/${role}/contracts?${filters}`
      : `/${role}/contracts`;
    return apiClient.get(url);
  },
  getContractDetails(role, contractId) {
    const url = `/${role}/contracts/${contractId}`;
    return apiClient.get(url);
  },
  getContractsStats(role) {
    const url = `/${role}/contracts/stats`;
    return apiClient.get(url);
  },
  getSetUpContractInfo(contractId) {
    const url = `/client/contracts/${contractId}/setup`;
    return apiClient.get(url);
  },
  setUpContract(contractId, payload) {
    payload.set("_method", "PUT");
    const url = `/client/contracts/${contractId}/activate`;
    return apiClient.post(url, payload);
  },
};

export { contractApi };
