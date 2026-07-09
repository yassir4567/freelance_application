import { useEffect, useState } from "react";
import { contractApi } from "../../../api/contracts/contractApi";
import { useTranslation } from "react-i18next";

function useContracts(searchParams, role) {
  const { t } = useTranslation();
  const [contracts, setContracts] = useState([]);
  const [contractStats, setContractStats] = useState([]);

  useEffect(() => {
    const loadContractStats = async () => {
      const result = await contractApi.getContractsStats(role);
      setContractStats(result.data);
    };
    loadContractStats();
  }, []);

  useEffect(() => {
    const loadContracts = async () => {
      const queryString = searchParams.toString();
      const result = await contractApi.getContracts(role, queryString);
      setContracts(result.data);
    };
    loadContracts();
  }, [searchParams, role]);


  return { contracts, contractStats };
}

export default useContracts;
