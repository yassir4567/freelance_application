import { useEffect, useState } from "react";
import styles from "../../styles/FundDeliverableModal.module.css";
import { RiRefund2Line } from "react-icons/ri";

function FundDeliverableModal({ isOpen, onClose, amount }) {
  const [deadline, setDeadline] = useState("");

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


  const handleSubmit = (e) => {
    e.preventDefault()
  }

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

        <form className={styles.form}>
          <div className={styles.inputBox}>
            <label>Amount</label>
            <input type="text" readOnly value={"$" + amount} />
          </div>

          <div className={styles.inputBox}>
            <label>Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
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
