import { useEffect, useState } from "react";
import { contractApi } from "../../../api/contracts/contractApi";
import { useAuth } from "../../../context/AuthContext";

function useContractDetails(contractId, role, t) {
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadContract = async () => {
      if (!contractId || !role) {
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      const result = await contractApi.getContractDetails(role, contractId);

      if (result.success) {
        setContract(result.data ?? null);
        setIsLoading(false);
        return;
      }

      setContract(null);
      setErrorMessage(
        result.message || t("ui.states.contractUnavailableTitle"),
      );
      setIsLoading(false);
    };

    loadContract();
  }, [role, contractId, role]);

  return { isLoading, errorMessage, contract, setContract };
}

export default useContractDetails;
