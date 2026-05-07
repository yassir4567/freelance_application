import { useEffect, useMemo, useState } from "react";
import styles from "../styles/ClientActiveContract.module.css";
import { useParams } from "react-router-dom";
import { getSetupContractInfo } from "../../../api/contracts/getSetupContractInfo";
import ClientActiveContractHeader from "../components/ClientActiveContractHeader";
import { useAuth } from "../../../context/AuthContext";

function ClientActiveContract() {
  const [setupInfo, setSetupInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { contractId } = useParams();

  useEffect(() => {
    const loadSetupInfo = async () => {
      setIsLoading(true);
      const result = await getSetupContractInfo(contractId);
      if (result.success) {
        setSetupInfo(result.data ?? null);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    };
    loadSetupInfo();
  }, []);

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

  const role = user.role;
  return (
    <div className={styles.container}>
      <ClientActiveContractHeader
        contractInfo={contractInfo}
        freelancerInfo={freelancerInfo}
        role={role}
      />
    </div>
  );
}

export default ClientActiveContract;
