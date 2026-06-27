import { useEffect, useMemo, useState } from "react";
import styles from "../styles/ClientActiveContract.module.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ClientActiveContractHeader from "../components/ClientActiveContractHeader";
import { useAuth } from "../../../context/AuthContext";
import { FiArrowLeft } from "react-icons/fi";
import ContractSetUpForm from "../components/ContractSetUpForm";
import contractImg from "../../../assets/images/contract_img.svg";
import ClientSetUpDeliverableForm from "../components/ClientSetUpDeliverableForm";
import SetUpContractPaymentSummary from "../components/SetUpContractPaymentSummary";
import CreatedDeliverableCollapse from "../components/CreatedDeliverableCollapse";
import SetUpContractFinalStep from "../components/SetUpContractFinalStep";
import SubmitSetupModal from "../components/modals/SubmitSetupModal";
import { useTranslation } from "react-i18next";
import { contractApi } from "../../../api/contracts/contractApi";

function ClientActiveContract() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [setupInfo, setSetupInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [setUpContractFormData, setSetUpContractFormData] = useState({
    final_price: "",
    final_deadline: "",
    description: "",
    contract_pdf: null,
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

  const nextStep = () => {
    console.log(setUpContractFormData);

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

  // * show and close send modal functions
  const onShowSendModal = () => setShowModal(true);
  const onCloseSendModal = () => setShowModal(false);

  // * handle send activate contract data to backend
  const handleSubmitContractSetUp = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = new FormData();

    payload.append("final_price", setUpContractFormData.final_price);
    payload.append("final_deadline", setUpContractFormData.final_deadline);
    payload.append("description", setUpContractFormData.description);
    payload.append("contract_pdf", setUpContractFormData.contract_pdf);
    payload.append(
      "deliverables",
      JSON.stringify(
        deliverables.map((deliverable, index) => ({
          title: deliverable.title,
          amount: Number(deliverable.amount),
          description: deliverable.description,
          position: index + 1,
        })),
      ),
    );


    const result = await contractApi.setUpContract(contractId, payload);
    setIsSubmitting(false);

    if (!result.success) {
      console.log(result);
      return;
    }
    navigate(`/dashboard/client/contracts/${contractId}`);
    return;
  };

  if (isLoading) return <div>{t("ui.states.loading")}...</div>;

  if (!success || !setupInfo) {
    return (
      <div className={styles.contractSetUpPage}>
        <div className={`${styles.stateCard} ${styles.errorState}`}>
          <p className={styles.stateKicker}>{t("ui.states.pageUnavailable")}</p>
          <h1 className={styles.stateMessage}>{t("ui.states.pageUnavailableTitle")}</h1>
          <NavLink
            to={`/dashboard/client/contracts`}
            className={styles.backLink}
          >
            <FiArrowLeft />
            <span>{t("common.actions.backToContracts")}</span>
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
                    {t("setUpContract.deliverableForm.title")}
                  </h1>
                  <p className={styles.deliverablesFormsDescription}>
                    {t("setUpContract.deliverableForm.description")}
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

          {step === 2 && (
            <SetUpContractFinalStep
              nextStep={nextStep}
              previousStep={previousStep}
              setUpContractFormData={setUpContractFormData}
              deliverables={deliverables}
              onShowSendModal={onShowSendModal}
            />
          )}
        </div>
      </div>

      {showModal && (
        <SubmitSetupModal
          onClose={onCloseSendModal}
          isSubmitting={isSubmitting}
          onConfirm={handleSubmitContractSetUp}
        />
      )}
    </div>
  );
}

export default ClientActiveContract;
