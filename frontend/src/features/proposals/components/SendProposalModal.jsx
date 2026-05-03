import { useEffect, useState } from "react";
import styles from "../styles/SendProposalModal.module.css";
import { sendProposal } from "../../../api/proposals/sendProposal";
import { useNavigate } from "react-router-dom";

function SendProposalModal({ projectId, isOpen, onClose }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cover_letter: "",
    delivery_time: "",
    unit: "day",
    budget: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    let newErrors = {};

    if (!form.budget.trim()) {
      newErrors.budget = "Budget is required";
    }

    if (!form.delivery_time.trim()) {
      newErrors.delivery_time = "Delivery time is required";
    }

    if (!form.cover_letter.trim()) {
      newErrors.cover_letter = "cover_letter is required";
    } else if (form.cover_letter.length < 30) {
      newErrors.cover_letter = "cover_letter must be atleast 30 character";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      cover_letter: form.cover_letter,
      price: +form.budget,
      delivery_time: `${form.delivery_time} ${form.unit}`,
    };

    const result = await sendProposal(projectId ,payload);
    if (!result.success) {
      setErrors(result.errors ?? []);
      return;
    }

    navigate("/dashboard/freelancer/my-proposals");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal}>
          <h1 className={styles.title}>Send Your proposal</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputBox}>
              <label>Budget</label>
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChangeInput}
                className={styles.budgetInput}
                placeholder="Enter your price"
              />
              {errors.budget && <p className={styles.error}>{errors.budget}</p>}
            </div>

            <div className={styles.inputBox}>
              <label>Delivery time</label>
              <div className={styles.deliveryBox}>
                <input
                  type="number"
                  name="delivery_time"
                  value={form.delivery_time}
                  onChange={handleChangeInput}
                  placeholder="Enter your delivery time"
                />
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChangeInput}
                >
                  <option value="day">day</option>
                  <option value="month">month</option>
                  <option value="year">year</option>
                </select>
              </div>
              {errors.delivery_time && (
                <p className={styles.error}>{errors.delivery_time}</p>
              )}
            </div>
          </div>

          <div className={styles.textAreaBox}>
            <label>Cover letter</label>
            <textarea
              name="cover_letter"
              value={form.cover_letter}
              onChange={handleChangeInput}
              placeholder="Cover letter ..."
            ></textarea>
            {errors.cover_letter && (
              <p className={styles.error}>{errors.cover_letter}</p>
            )}
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.sentBtn}>
              Sent
            </button>
            <button type="reset" onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendProposalModal;
