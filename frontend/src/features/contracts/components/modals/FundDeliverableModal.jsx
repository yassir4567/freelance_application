import { useEffect, useState } from "react";
import styles from "../../styles/FundDeliverableModal.module.css";
import { RiRefund2Line } from "react-icons/ri";
import { fundDeliverable } from "../../../../api/payments/fundDeliverable";
import { getClientContractDetail } from "../../../../api/contracts/getClientContractDetail";

function FundDeliverableModal({
  isOpen,
  onClose,
  deliverable,
  contract,
  setContract,
}) {
  const [deadline, setDeadline] = useState("");
  const [deadlineError, setDeadlineError] = useState("");
  // * stop the scrolling when modal is open
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // * close modal with escape key
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // * validate deadline function
  const validateDeadline = (value) => {
    if (!value) return "Deadline required";

    const deadline = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(deadline.getTime())) {
      return "Deadline must be valid date";
    } else if (deadline < today) {
      return "Deadline cannot be in the past";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deadline.trim()) {
      setDeadlineError("Deadline required");
      return;
    }

    const deadlineValidation = validateDeadline(deadline);

    if (deadlineValidation) {
      setDeadlineError(deadlineValidation);
      return;
    }

    const payload = {
      deadline: deadline,
    };
    const result = await fundDeliverable(payload, deliverable.id);

    if (!result.success) {
      console.log(result);
      return;
    }

    const contractResult = await getClientContractDetail(contract.id);
    setContract(contractResult.data);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconBox}>
          <RiRefund2Line className={styles.icon} />
        </div>
        <h2 className={styles.title}>Fund Deliverable</h2>
        <p className={styles.description}>
          Add a deadline and confirm the escrow funding for this deliverable.
          The freelancer will be able to start working once the payment is
          secured.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputBox}>
            <label>Amount</label>
            <input type="text" readOnly value={"$" + deliverable.amount} />
          </div>

          <div className={styles.inputBox}>
            <label>Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            {deadlineError && <p className={styles.error}>{deadlineError}</p>}
          </div>

          <div className={styles.actions}>
            <button type="reset" onClick={onClose} className={styles.cancelBtn}>
              cancel
            </button>
            <button type="submit" className={styles.fundBtn}>
              Fund
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FundDeliverableModal;
