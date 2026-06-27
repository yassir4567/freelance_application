import { useState } from "react";
import styles from "../styles/LeaveFeedbackForm.module.css";
import { leaveFeedback } from "../../../api/feedbacks/leaveFeedback";
import { acceptDeliverable } from "../../../api/deliverables/acceptDeliverable";
import { contractApi } from "../../../api/contracts/contractApi";

function LeaveFeedbackForm({ contract, setContract, onClose, deliverable }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setForm] = useState({
    feedback: "",
    note: 0,
  });
  const [errors, setErrors] = useState({
    feedback: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "range" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    let newErrors = {};

    if (form.feedback.length == 0) {
      newErrors.feedback = "Feedback required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({
        feedback: newErrors.feedback || "",
      });
      return;
    }

    setIsSubmit(true);

    const payload = {
      contenu: form.feedback,
      note: form.note,
    };

    const acceptResult = await acceptDeliverable(deliverable.id);
    if (!acceptResult.success) {
      setIsSubmit(false);
      return;
    }

    const result = await leaveFeedback(contract.id, payload);
    if (!result.success) {
      setIsSubmit(false);
      return;
    }

    const contractResult = await contractApi.getContractDetails('client' , contract.id)

    if (contractResult.success) {
      setContract(contractResult.data);
    }

    setIsSubmit(false);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputBox}>
        <label htmlFor="">Feedback</label>
        <textarea
          name="feedback"
          value={form.feedback}
          onChange={handleInputChange}
          placeholder="Leave feedback"
        ></textarea>
        {errors.feedback && <p className={styles.error}>{errors.feedback}</p>}
      </div>

      <div className={styles.inputBox}>
        <label htmlFor="" className={styles.ratingLabel}>
          <span>Rating </span>
          <span>({form.note})</span>
        </label>
        <input
          type="range"
          name="note"
          min="0"
          max="5"
          step="1"
          value={form.note}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.btn}>
          {isSubmit ? "Submitting..." : "Accept & Complete Contract"}
        </button>
      </div>
    </form>
  );
}

export default LeaveFeedbackForm;
