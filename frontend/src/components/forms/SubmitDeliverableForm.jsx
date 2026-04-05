import { useState } from "react";
import styles from "./SubmitDeliverableForm.module.css";
import { FaPlus } from "react-icons/fa6";

function SubmitDeliverableForm() {
  const [note, setNote] = useState("");
  const [links, setLinks] = useState([""]);
  const [errors, setErrors] = useState({
    links: "",
    note: "",
  });

  const handleAddLink = () => {
    const hasEmpty = links.some((link) => link.trim() === "");
    if (hasEmpty) {
      setErrors((prev) => ({ ...prev, links: "Fill the previous one first" }));
    } else {
      setLinks([...links, ""]);
      setErrors((prev) => ({ ...prev, links: "" }));
    }
  };

  const handleChange = (value, index) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleSubmit = (e) => {
    e.preventDefatult();
  };

  return (
    <form action="" onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.formTitle}>Submit Deliverable Form</h1>
      <p className={styles.clarificationInfo}>
        <span>⚠️</span>
        <span>All old links will be replaced</span>
      </p>

      <div className={styles.submissionNoteBox}>
        <label className={styles.label}>Submission note </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter Submission note"
          required
          minLength={10}
        ></textarea>
      </div>
      <div className={styles.inputBox}>
        <label className={styles.label}>Links </label>
        {links.map((link, index) => (
          <input
            key={index}
            type="url"
            value={link}
            onChange={(e) => handleChange(e.target.value, index)}
            placeholder="https://..."
            required
          />
        ))}
      </div>

      {errors.links && <p className={styles.error}>{errors.links}</p>}

      <div className={styles.actions}>
        <div>
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </div>
        <div className={styles.addLinkBtn} onClick={handleAddLink}>
          <FaPlus />
          <span>Add link</span>
        </div>
      </div>
    </form>
  );
}

export default SubmitDeliverableForm;
