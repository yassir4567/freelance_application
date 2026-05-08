import { useState } from "react";
import styles from "../styles/ClientSetUpDeliverableForm.module.css";
import { FiPlus } from "react-icons/fi";

function ClientSetUpDeliverableForm({
  nextStep,
  previousStep,
  form,
  setForm,
  handleAddDeliverable,
  totalDeliverables,
}) {
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
      return "Price required";
    }

    const numberPrice = Number(value);
    if (!Number.isFinite(numberPrice)) {
      return "Price must be a valid number";
    } else if (numberPrice <= 1) {
      return "Price must be greater than 1$";
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
      newErrors.title = "Title required";
    }

    // * validate description
    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    } else if (form.description.length < 100) {
      newErrors.description = "Description must be at least 100 character";
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

    if (totalDeliverables >= 1) {
      nextStep();
      return;
    }

    const isValid = validateForm();
    if (!isValid) {
      return;
    }
  };

  const handleAddDeliverableForm = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    handleAddDeliverable(form);
    setForm({ title: "", amount: "", descrdeliverableNumbeription: "" });
  };

  return (
    <form className={styles.form}>
      <h5 className={styles.title}>Deliverable #{totalDeliverables + 1}</h5>
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label>Deliverable Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder="Enter your deliverable title "
          />
          {errors.title && <div className={styles.error}>{errors.title}</div>}
        </div>

        <div className={styles.inputBox}>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleInputChange}
            placeholder="Enter the deliverable amount"
          />
          {errors.amount && <div className={styles.error}>{errors.amount}</div>}
        </div>
      </div>

      <div className={styles.textareaBox}>
        <div className={styles.textareaLabelBox}>
          <label>Deliverbale description</label>
          <p>{form.description.length} / 1000</p>
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder="Describe the work scope, expectations, and important details..."
        />
        {errors.description && (
          <div className={styles.error}>{errors.description}</div>
        )}
      </div>
      <div className={styles.actions}>
        <button onClick={handleAddDeliverableForm} className={styles.add}>
          <FiPlus /> <span>Add deliverable</span>
        </button>
        <button onClick={handleNextStep} className={styles.next}>
          Next
        </button>
      </div>
    </form>
  );
}

export default ClientSetUpDeliverableForm;
