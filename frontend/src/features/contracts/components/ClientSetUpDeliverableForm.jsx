import { useState } from "react";
import styles from "../styles/ClientSetUpDeliverableForm.module.css";
import { FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next";

function ClientSetUpDeliverableForm({
  nextStep,
  previousStep,
  form,
  setForm,
  handleAddDeliverable,
  totalDeliverables,
  contractPrice,
  totalDeliverablesAmount,
}) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({
    title: "",
    amount: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "description" && value.length > 1000) {
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // * validate price function
  const validatePrice = (value) => {
    if (!value) {
      return t("common.validation.priceRequired");
    }

    const numberPrice = Number(value);
    if (!Number.isFinite(numberPrice)) {
      return t("common.validation.invalidPrice");
    } else if (numberPrice <= 1) {
      return t(
        "setUpContract.deliverableForm.form.amount.errors.priceLessThanFive",
      );
    }

    return "";
  };

  const validateForm = () => {
    setErrors({});
    let newErrors = {};

    // * validate amount
    const priceValidation = validatePrice(form.amount);
    if (priceValidation) {
      newErrors.amount = priceValidation;
    }

    // * validate title
    if (!form.title.trim()) {
      newErrors.title = t("common.validation.titleRequired");
    }

    // * validate description
    if (!form.description.trim()) {
      newErrors.description = t("common.validation.descriptionRequired");
    } else if (form.description.length < 30) {
      newErrors.description = t("common.validation.descriptionLessThanThirty");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({
        amount: newErrors.amount ?? "",
        title: newErrors.title ?? "",
        description: newErrors.description ?? "",
      });
      return false;
    }

    return true;
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    nextStep();
  };

  const handleAddDeliverableForm = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    handleAddDeliverable(form);
  };

  const isAmountCompleted =
    Number(contractPrice) === Number(totalDeliverablesAmount);

  return (
    <form className={styles.form}>
      <h5 className={styles.title}>
        {t("common.labels.deliverable")} #{totalDeliverables + 1}
      </h5>
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label>{t("setUpContract.deliverableForm.form.title.label")}</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder={t(
              "setUpContract.deliverableForm.form.title.placeholder",
            )}
          />
          {errors.title && <div className={styles.error}>{errors.title}</div>}
        </div>

        <div className={styles.inputBox}>
          <label>{t("common.labels.amount")}</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleInputChange}
            placeholder={t(
              "setUpContract.deliverableForm.form.amount.placeholder",
            )}
          />
          {errors.amount && <div className={styles.error}>{errors.amount}</div>}
        </div>
      </div>

      <div className={styles.textareaBox}>
        <div className={styles.textareaLabelBox}>
          <label>
            {t("setUpContract.deliverableForm.form.description.label")}
          </label>
          <p>{form.description.length} / 1000</p>
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder={t(
            "setUpContract.deliverableForm.form.description.placeholder",
          )}
        />
        {errors.description && (
          <div className={styles.error}>{errors.description}</div>
        )}
      </div>
      <div className={styles.actions}>
        {!isAmountCompleted && (
          <button
            type="button"
            onClick={handleAddDeliverableForm}
            className={styles.add}
          >
            <FiPlus /> <span>Add deliverable</span>
          </button>
        )}
        <button
          type="button"
          onClick={() => previousStep()}
          className={styles.step}
        >
          previous
        </button>
        {isAmountCompleted && (
          <button
            type="button"
            onClick={handleNextStep}
            className={styles.step}
          >
            Next
          </button>
        )}
      </div>
    </form>
  );
}

export default ClientSetUpDeliverableForm;
