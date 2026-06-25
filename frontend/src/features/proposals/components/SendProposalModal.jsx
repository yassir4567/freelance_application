import { useEffect, useState } from "react";
import styles from "../styles/SendProposalModal.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { proposalApi } from "../../../api/proposals/proposalApi";

function SendProposalModal({ projectId, isOpen, onClose }) {
  const { t } = useTranslation();
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
      newErrors.budget = t("ui.validation.budgetRequired");
    }

    if (!form.delivery_time.trim()) {
      newErrors.delivery_time = t("ui.validation.deliveryTimeRequired");
    }

    if (!form.cover_letter.trim()) {
      newErrors.cover_letter = t("ui.validation.coverLetterRequired");
    } else if (form.cover_letter.length < 30) {
      newErrors.cover_letter = t("ui.validation.coverLetterLength");
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

    const result = await proposalApi.send(projectId ,payload);
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
          <h1 className={styles.title}>{t("sendProposal.title")}</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputBox}>
              <label>{t("common.labels.budget")}</label>
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChangeInput}
                className={styles.budgetInput}
                placeholder={t("sendProposal.pricePlaceholder")}
              />
              {errors.budget && <p className={styles.error}>{errors.budget}</p>}
            </div>

            <div className={styles.inputBox}>
              <label>{t("ui.labels.deliveryTime")}</label>
              <div className={styles.deliveryBox}>
                <input
                  type="number"
                  name="delivery_time"
                  value={form.delivery_time}
                  onChange={handleChangeInput}
                  placeholder={t("sendProposal.deliveryPlaceholder")}
                />
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChangeInput}
                >
                  <option value="day">{t("ui.units.day")}</option>
                  <option value="month">{t("ui.units.month")}</option>
                  <option value="year">{t("ui.units.year")}</option>
                </select>
              </div>
              {errors.delivery_time && (
                <p className={styles.error}>{errors.delivery_time}</p>
              )}
            </div>
          </div>

          <div className={styles.textAreaBox}>
            <label>{t("ui.labels.coverLetter")}</label>
            <textarea
              name="cover_letter"
              value={form.cover_letter}
              onChange={handleChangeInput}
              placeholder={t("sendProposal.coverLetterPlaceholder")}
            ></textarea>
            {errors.cover_letter && (
              <p className={styles.error}>{errors.cover_letter}</p>
            )}
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.sentBtn}>
              {t("ui.actions.send")}
            </button>
            <button type="reset" onClick={onClose} className={styles.cancelBtn}>
              {t("ui.actions.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendProposalModal;
