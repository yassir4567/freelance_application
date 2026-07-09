import { useEffect, useMemo, useState } from "react";
import { contractApi } from "../../../api/contracts/contractApi";

function useContractSetUpInfo(contractId) {
  const [setupInfo, setSetupInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadSetupInfo = async () => {
      setIsLoading(true);
      const result = await contractApi.getSetUpContractInfo(contractId);
      if (result.success) {
        setSetupInfo(result.data ?? null);
        setIsLoading(false);
        setSuccess(result.success);
        return;
      }

      setIsLoading(false);
      setSuccess(result.success);
    };
    loadSetupInfo();
  }, [contractId]);

  const freelancerInfo = useMemo(() => {
    const freelancer = setupInfo?.proposal?.freelancer;
    return {
      id: freelancer?.id,
      user_id: freelancer?.user_id,
      title: freelancer?.title,
      first_name: freelancer?.user?.first_name,
      last_name: freelancer?.user.last_name,
    };
  }, [setupInfo]);

  const contractInfo = useMemo(() => {
    return {
      projectTitle: setupInfo?.proposal?.project?.title,
      contractStatus: setupInfo?.status,
    };
  }, [setupInfo]);

  return { isLoading, success, setupInfo, freelancerInfo, contractInfo };
}

export default useContractSetUpInfo;
