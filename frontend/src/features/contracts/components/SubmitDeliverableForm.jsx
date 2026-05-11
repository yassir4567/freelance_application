import { useState } from "react";
import styles from "../styles/SubmitDeliverableForm.module.css";
import { FaPlus } from "react-icons/fa6";
import { submitDeliverable } from "../../../api/deliverables/submitDeliverable";
import { getFreelancerContractDetail } from "../../../api/contracts/getFreelancerContractDetail";

function SubmitDeliverableForm({
  setContract,
  deliverableId,
  contractId,
  onClose,
}) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    let newErrors = {};

    if (!note.trim()) {
      newErrors.note = "Note required";
    }
    const safeLinks = links.filter((link) => link.trim() !== "");

    if (safeLinks.length === 0) {
      newErrors.links = "Enter at least one link";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({
        note: newErrors.note || "",
        links: newErrors.links || "",
      });
      return;
    }

    const payload = {
      submission_note: note.trim(),
      links: safeLinks,
    };

    const result = await submitDeliverable(payload, deliverableId);

    if (!result.success) {
      console.log(result);
      return;
    }

    const contractResult = await getFreelancerContractDetail(contractId);
    setContract(contractResult.data);
    onClose();
  };

  return (
    <form action="" onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.formTitle}>Submit Deliverable Form</h1>
      <p className={styles.clarificationInfo}>
        <span>All old links will be replaced</span>
      </p>

      <div className={styles.submissionNoteBox}>
        <label className={styles.label}>Submission note </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter Submission note"
          minLength={10}
        ></textarea>
        {errors.note && <p className={styles.error}>{errors.note}</p>}
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
