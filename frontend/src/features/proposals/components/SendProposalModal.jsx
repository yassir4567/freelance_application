import { useEffect } from "react";
import styles from "../styles/SendProposalModal.module.css";

function SendProposalModal({ isOpen, onClose }) {
  // * stop the scrolling when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // * close modal when click to Escape key
  useEffect(() => {
    if (!isOpen) return;

    const hanldeEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", hanldeEscape);
    return () => {
      window.removeEventListener("keydown", hanldeEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal}>
          <h1 className={styles.title}>Send Your proposal</h1>
        </div>

        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputBox}>
              <label>Budget</label>
              <input type="text" className={styles.budgetInput} placeholder="Enter your price" />
            </div>

            <div className={styles.inputBox}>
              <label>Delivery time</label>
              <div className={styles.deliveryBox}>
                <input type="number" placeholder="Enter your delivery time" />
                <select>
                  <option value="day">day</option>
                  <option value="month">month</option>
                  <option value="year">year</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.textAreaBox}>
            <label>Cover letter</label>
            <textarea
              name="cover_letter"
              placeholder="Cover letter ..."
            ></textarea>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.sentBtn}>Sent</button>
            <button type="reset" className={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendProposalModal;
