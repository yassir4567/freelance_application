import { useEffect, useMemo, useState } from "react";
import styles from "../styles/ClientActiveContract.module.css";
import { NavLink, useParams } from "react-router-dom";
import { getSetupContractInfo } from "../../../api/contracts/getSetupContractInfo";
import ClientActiveContractHeader from "../components/ClientActiveContractHeader";
import { useAuth } from "../../../context/AuthContext";
import { FiArrowLeft } from "react-icons/fi";

function ClientActiveContract() {
  const [setupInfo, setSetupInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const { contractId } = useParams();

  useEffect(() => {
    const loadSetupInfo = async () => {
      setIsLoading(true);
      const result = await getSetupContractInfo(contractId);
      console.log(result);
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

  if (!success || !setupInfo) {
    return (
      <div className={styles.contractSetUpPage}>
        <div className={`${styles.stateCard} ${styles.errorState}`}>
          <p className={styles.stateKicker}>unavailable</p>
          <h1 className={styles.stateMessage}>We could not load this page.</h1>
          <NavLink
            to={`/dashboard/client/contracts`}
            className={styles.backLink}
          >
            <FiArrowLeft />
            <span>Back to contracts</span>
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contractSetUpPage}>
      <ClientActiveContractHeader
        contractInfo={contractInfo}
        freelancerInfo={freelancerInfo}
        role={role}
      />
    </div>
  );
}

export default ClientActiveContract;
