import { useState } from "react";
import { contractApi } from "../../../api/contracts/contractApi";
import { useNavigate } from "react-router-dom";

function useSubmitContractSetUp(
  contractId,
  setUpContractFormData,
  deliverables,
) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      return;
    }
    navigate(`/dashboard/client/contracts/${contractId}`);
    return;
  };

  return { isSubmitting, handleSubmitContractSetUp };
}

export default useSubmitContractSetUp;
