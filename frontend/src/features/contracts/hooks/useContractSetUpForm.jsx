import { useState } from "react";

function useContractSetUpForm() {
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

  const nextStep = () => {
    setStep((currentStep) => currentStep + 1);
  };

  const previousStep = () => {
    setStep((currentStep) => currentStep - 1);
  };

  const handleAddDeliverable = (form) => {
    setDeliverables((prev) => [...prev, form]);
    setDeliverableForm({
      title: "",
      description: "",
      amount: "",
    });
  };

  const handleRemoveDeliverable = (index) => {
    const filtredDeliverables = deliverables.filter((_, i) => i !== index);
    setDeliverables(filtredDeliverables);
  };

  const totalDeliverables = deliverables.length;
  const totalDeliverablesAmount = deliverables.reduce(
    (acc, cur) => acc + +cur.amount,
    0,
  );

  return {
    step,
    nextStep,
    previousStep,

    setUpContractFormData,
    setSetUpContractFormData,

    deliverables,
    setDeliverables,
    deliverableForm,
    setDeliverableForm,

    handleAddDeliverable,
    handleRemoveDeliverable,

    totalDeliverables,
    totalDeliverablesAmount,
  };
}

export default useContractSetUpForm;
