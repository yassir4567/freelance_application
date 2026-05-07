import { useState } from "react";
import styles from "../styles/ContractSetUpForm.module.css";
function ContractSetUpForm({ nextStep, form, setForm }) {
  const [errors, setErrors] = useState({
    final_price: "",
    final_deadline: "",
    description: "",
  });

  // * handle set up form inputs change
  const handleInputsChage = (e) => {
    const { name, value } = e.target;

    if (name === "description" && value.length > 2000) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    // * validate price
    const numberPrice = Number(form.final_price);
    if (!form.final_price.trim()) {
      newErrors.final_price = "Price required";
    } else if (!Number.isFinite(numberPrice)) {
      newErrors.final_price = "Price must be a valid number";
    } else if (numberPrice <= 5) {
      newErrors.final_price = "Price must be greater than 5$";
    }

    // * validate deadline
    const deadline = new Date(form.final_deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!form.final_deadline.trim()) {
      newErrors.final_deadline = "Deadline required";
    } else if (Number.isNaN(deadline.getTime())) {
      newErrors.final_deadline = "Deadline must be valid date";
    } else if (deadline < today) {
      newErrors.final_deadline = "Deadline cannot be in the past";
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
              onChange={handleInputsChage}
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
              onChange={handleInputsChage}
            />{" "}
            {errors.final_deadline && (
              <div className={styles.error}>{errors.final_deadline}</div>
            )}
          </div>
        </div>

        <div className={styles.textareaBox}>
          <div className={styles.textareaLabelBox}>
            <label>Contract description</label>
            <p>{form.description.length} / 1500</p>
          </div>
          <textarea
            value={form.description}
            onChange={handleInputsChage}
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
