import { useEffect, useMemo, useState } from "react";
import styles from "../styles/ClientActiveContract.module.css";
import { NavLink, useParams } from "react-router-dom";
import { getSetupContractInfo } from "../../../api/contracts/getSetupContractInfo";
import ClientActiveContractHeader from "../components/ClientActiveContractHeader";
import { useAuth } from "../../../context/AuthContext";
import { FiArrowLeft } from "react-icons/fi";
import ContractSetUpForm from "../components/ContractSetUpForm";
import contractImg from "../../../assets/images/contract_img.svg";
import ClientSetUpDeliverableForm from "../components/ClientSetUpDeliverableForm";
import SetUpContractPaymentSummary from "../components/SetUpContractPaymentSummary";
import CreatedDeliverableCollapse from "../components/CreatedDeliverableCollapse";

function ClientActiveContract() {
  const [setupInfo, setSetupInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [setUpContractFormData, setSetUpContractFormData] = useState({
    final_price: "",
    final_deadline: "",
    description: "",
  });

  const [deliverables, setDeliverables] = useState([]);

  const [deliverableForm, setDeliverableForm] = useState({
    title: "",
    description: "",
    amount: "",
  });

  const [step, setStep] = useState(0);
  const { user } = useAuth();
  const { contractId } = useParams();

  useEffect(() => {
    const loadSetupInfo = async () => {
      setIsLoading(true);
      const result = await getSetupContractInfo(contractId);
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

  const nextStep = () => {
    setStep((currentStep) => currentStep + 1);
  };

  const previousStep = () => {
    setStep((currentStep) => currentStep - 1);
  };

  // * add deliverable to deliverables list
  const handleAddDeliverable = (form) => {
    setDeliverables((prev) => [...prev, form]);
    setDeliverableForm({
      title: "",
      description: "",
      amount: "",
    });
  };

  // * remove deliverable
  const handleRemoveDeliverable = (index) => {
    const filtredDeliverables = deliverables.filter((_, i) => i !== index);
    setDeliverables(filtredDeliverables);
  };

  const role = user?.role;
  const totalDeliverables = deliverables.length;
  const totalDeliverablesAmount = deliverables.reduce(
    (acc, cur) => acc + +cur.amount,
    0,
  );

  if(isLoading) return <div>Loading...</div>

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

      <div className={styles.main}>
        <div className={styles.wrapper}>
          {step === 0 && (
            <div className={styles.setUpFormBox}>
              <div className={styles.setUpForm}>
                <ContractSetUpForm
                  nextStep={nextStep}
                  form={setUpContractFormData}
                  setForm={setSetUpContractFormData}
                />
              </div>
              <div className={styles.contractImg}>
                <img src={contractImg} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className={styles.deliverablesContainer}>
              <div className={styles.deliverablesWrapper}>
                <div className={styles.deliverablesFormsHeader}>
                  <h1 className={styles.deliverablesFormsTitle}>
                    Set up contract deliverables
                  </h1>
                  <p className={styles.deliverablesFormsDescription}>
                    Break the contract into clear deliverables with deadlines
                    and payment amounts. Enter them in order
                  </p>
                </div>

                <div className={styles.deliverablesFormBox}>
                  <ClientSetUpDeliverableForm
                    nextStep={nextStep}
                    previousStep={previousStep}
                    form={deliverableForm}
                    setForm={setDeliverableForm}
                    handleAddDeliverable={handleAddDeliverable}
                    totalDeliverables={totalDeliverables}
                    totalDeliverablesAmount={totalDeliverablesAmount}
                    contractPrice={setUpContractFormData.final_price}
                  />
                </div>

                <div className={styles.createdDeliverablesBox}>
                  {deliverables.map((deliverable, index) => (
                    <CreatedDeliverableCollapse
                      key={index}
                      deliverable={deliverable}
                      index={index}
                      setDeliverables={setDeliverables}
                      handleRemoveDeliverable={handleRemoveDeliverable}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.paymentSummary}>
                <SetUpContractPaymentSummary
                  final_price={setUpContractFormData.final_price}
                  totalDeliverablesAmount={totalDeliverablesAmount}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientActiveContract;
