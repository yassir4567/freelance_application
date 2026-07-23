import type { Role } from "../../types/user.types";
import apiClient from "../apiClient";

const contractApi = {
  getContracts<TResponse>(role: Exclude<Role, "admin">, filters: string) {
    const url = filters
      ? `/${role}/contracts?${filters}`
      : `/${role}/contracts`;
    return apiClient.get<TResponse>(url);
  },
  getContractDetails<TResponse>(role: Exclude<Role, "admin">, contractId: number) {
    const url = `/${role}/contracts/${contractId}`;
    return apiClient.get<TResponse>(url);
  },
  getContractsStats<TResponse>(role: Exclude<Role, "admin">) {
    const url = `/${role}/contracts/stats`;
    return apiClient.get<TResponse>(url);
  },
  getSetUpContractInfo<TResponse>(contractId: number) {
    const url = `/client/contracts/${contractId}/setup`;
    return apiClient.get<TResponse>(url);
  },
  setUpContract<TResponse>(contractId: number, payload: FormData) {
    payload.set("_method", "PUT");
    const url = `/client/contracts/${contractId}/activate`;
    return apiClient.post<TResponse>(url, payload);
  },
};

export { contractApi };
