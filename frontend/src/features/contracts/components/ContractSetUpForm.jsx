import { useState } from "react";
import styles from "../styles/ContractSetUpForm.module.css";
function ContractSetUpForm({ nextStep, form, setForm }) {
  const [errors, setErrors] = useState({
    final_price: "",
    final_deadline: "",
    description: "",
  });

  // * handle set up form inputs change
  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    if (name === "description" && value.length > 2000) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // * validate price function
  const validatePrice = (value) => {
    if (!value) {
      return "Price required";
    }

    const numberPrice = Number(value);
    if (!Number.isFinite(numberPrice)) {
      return "Price must be a valid number";
    } else if (numberPrice <= 5) {
      return "Price must be greater than 5$";
    }

    return "";
  };

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
      newErrors.description = "Description is required";
    } else if (form.description.length < 100) {
      newErrors.description = "Description must be at least 100 character";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({
        final_price: newErrors.final_price ?? "",
        final_deadline: newErrors.final_deadline ?? "",
        description: newErrors.description ?? "",
      });
      return;
    }
    setErrors({});
    nextStep();
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Set up the contract terms</h1>
      <p className={styles.formDescription}>
        Confirm the final price, deadline, and project description before
        activating the contract.
      </p>
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>Final price</label>
            <input
              type="number"
              name="final_price"
              value={form.final_price}
              onChange={handleInputsChange}
              placeholder="Enter the agreed final price"
            />
            {errors.final_price && (
              <div className={styles.error}>{errors.final_price}</div>
            )}
          </div>

          <div className={styles.inputBox}>
            <label>Final deadline</label>
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

        <div className={styles.textareaBox}>
          <div className={styles.textareaLabelBox}>
            <label>Contract description</label>
            <p>{form.description.length} / 2000</p>
          </div>
          <textarea
            value={form.description}
            onChange={handleInputsChange}
            name="description"
            placeholder="Describe the work scope, expectations, and important details..."
          />
          {errors.description && (
            <div className={styles.error}>{errors.description}</div>
          )}
        </div>

        <button onClick={handleNextStep} className={styles.next}>
          Next
        </button>
      </form>
    </div>
  );
}

export default ContractSetUpForm;
