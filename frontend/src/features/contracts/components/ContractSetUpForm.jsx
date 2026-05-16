import { useState } from "react";
import styles from "../styles/ContractSetUpForm.module.css";
import { useTranslation } from "react-i18next";
function ContractSetUpForm({ nextStep, form, setForm }) {
  const { t } = useTranslation();

  const [errors, setErrors] = useState({
    final_price: "",
    final_deadline: "",
    description: "",
    upload: "",
  });

  // * handle set up form inputs change
  const handleInputsChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "description" && value.length > 2000) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // * validate price function
  const validatePrice = (value) => {
    if (!value) {
      return t("common.validation.priceRequired");
    }

    const numberPrice = Number(value);
    if (!Number.isFinite(numberPrice)) {
      return t("common.validation.invalidPrice");
    } else if (numberPrice <= 5) {
      return t("common.validation.priceGreaterThanFive");
    }

    return "";
  };

  // * validate deadline function
  const validateDeadline = (value) => {
    if (!value) return t("common.validation.deadlineRequired");

    const deadline = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(deadline.getTime())) {
      return t("common.validation.invalidDeadline");
    } else if (deadline < today) {
      return t("common.validation.pastDeadline");
    }

    return "";
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    // * validate price

    const priceValidation = validatePrice(form.final_price);
    if (priceValidation) {
      newErrors.final_price = priceValidation;
    }

    const deadlinValidation = validateDeadline(form.final_deadline);

    if (deadlinValidation) {
      newErrors.final_deadline = deadlinValidation;
    }

    // * validate description
    if (!form.description.trim()) {
      newErrors.description = t("common.validation.descriptionRequired");
    } else if (form.description.length < 100) {
      newErrors.description = t(
        "setUpContract.setUpForm.form.description.errors.descriptionLessThanHundred",
      );
    }

    if (!form.contract_pdf) {
      newErrors.upload = t("setUpContract.setUpForm.form.upload.error");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({
        final_price: newErrors.final_price ?? "",
        final_deadline: newErrors.final_deadline ?? "",
        description: newErrors.description ?? "",
        upload: newErrors.upload ?? "",
      });
      return;
    }
    setErrors({});
    nextStep();
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>{t("setUpContract.setUpForm.title")}</h1>
      <p className={styles.formDescription}>
        {t("setUpContract.setUpForm.description")}
      </p>
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>{t("setUpContract.setUpForm.form.price.label")}</label>
            <input
              type="number"
              name="final_price"
              value={form.final_price}
              onChange={handleInputsChange}
              placeholder={t("setUpContract.setUpForm.form.price.placeholder")}
            />
            {errors.final_price && (
              <div className={styles.error}>{errors.final_price}</div>
            )}
          </div>

          <div className={styles.inputBox}>
            <label>{t("common.labels.finalDeadline")}</label>
            <input
              type="date"
              name="final_deadline"
              value={form.final_deadline}
              onChange={handleInputsChange}
            />{" "}
            {errors.final_deadline && (
              <div className={styles.error}>{errors.final_deadline}</div>
            )}
          </div>
        </div>

        <div className={styles.uploadWrapper}>
          <label htmlFor="contractFile" className={styles.uploadBox}>
            <div className={styles.icon}>📄</div>

            <h3>{t("setUpContract.setUpForm.form.upload.title")}</h3>
            <p>{t("setUpContract.setUpForm.form.upload.description")}</p>

            <span className={styles.uploadBtn}>{t("ui.actions.chooseFile")}</span>
          </label>

          <input
            id="contractFile"
            type="file"
            accept="application/pdf"
            name="contract_pdf"
            onChange={handleInputsChange}
            className={styles.fileInput}
          />

          {errors.upload && <p className={styles.error}>{errors.upload}</p>}

          {form.contract_pdf && (
            <div className={styles.filePreview}>
              <span>{form.contract_pdf.name}</span>
              <small>
                {(form.contract_pdf.size / 1024 / 1024).toFixed(2)} MB
              </small>
            </div>
          )}
        </div>

        <div className={styles.textareaBox}>
          <div className={styles.textareaLabelBox}>
            <label>{t("setUpContract.setUpForm.form.description.label")}</label>
            <p>{form.description.length} / 2000</p>
          </div>
          <textarea
            value={form.description}
            onChange={handleInputsChange}
            name="description"
            placeholder={t(
              "setUpContract.setUpForm.form.description.placeholder",
            )}
          />
          {errors.description && (
            <div className={styles.error}>{errors.description}</div>
          )}
        </div>

        <button onClick={handleNextStep} className={styles.next}>
          {t("ui.actions.next")}
        </button>
      </form>
    </div>
  );
}

export default ContractSetUpForm;
