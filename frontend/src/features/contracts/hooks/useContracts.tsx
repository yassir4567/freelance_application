import { useEffect, useState } from "react";
import { contractApi } from "../../../api/contracts/contractApi";
import type { Role } from "../../../types/user.types";

function useContracts<TContract>(
  searchParams: URLSearchParams,
  role: Exclude<Role, "admin">,
) {
  const [contracts, setContracts] = useState<TContract[]>([]);
  const [isContractsLoading, setIsContractsLoading] = useState(true);
  const [contractsError, setContractsError] = useState("");

  const [contractStats, setContractStats] = useState<Record<string, number>>(
    {},
  );
  const [isContractsStatsLoading, setIsContractsStatsLoading] = useState(true);
  const [contractsStatsError, setContractsStatsError] = useState("");

  useEffect(() => {
    const loadContractStats = async (): Promise<void> => {
      setIsContractsStatsLoading(true);
      setContractsStatsError("");
      const result =
        await contractApi.getContractsStats<Record<string, number>>(role);

      setIsContractsStatsLoading(false);

      if (!result.success) {
        setContractsStatsError(
          result.message || "Error in fetching contracts stats",
        );
        return;
      }
      setContractStats(result.data ?? {});
    };
    loadContractStats();
  }, [role]);

  useEffect(() => {
    const loadContracts = async (): Promise<void> => {
      setIsContractsLoading(true);
      setContractsError("");
      const queryString = searchParams.toString();
      const result = await contractApi.getContracts<TContract[]>(
        role,
        queryString,
      );

      setIsContractsLoading(false);

      if (!result.success) {
        setContractsError(result.message || "Error in fetching contracts list");
        return;
      }
      setContracts(result.data ?? []);
    };
    loadContracts();
  }, [searchParams, role]);

  return {
    contracts,
    isContractsLoading,
    contractsError,
    contractStats,
    isContractsStatsLoading,
    contractsStatsError,
  };
}

export default useContracts;
