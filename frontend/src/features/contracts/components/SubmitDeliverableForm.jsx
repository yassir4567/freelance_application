import { useState } from "react";
import styles from "../styles/SubmitDeliverableForm.module.css";
import { FaPlus } from "react-icons/fa6";
import { submitDeliverable } from "../../../api/deliverables/submitDeliverable";
import { getFreelancerContractDetail } from "../../../api/contracts/getFreelancerContractDetail";
import { useTranslation } from "react-i18next";

function SubmitDeliverableForm({
  setContract,
  deliverableId,
  contractId,
  onClose,
}) {
  const { t } = useTranslation();
  const [note, setNote] = useState("");
  const [links, setLinks] = useState([""]);
  const [errors, setErrors] = useState({
    links: "",
    note: "",
  });

  const handleAddLink = () => {
    const hasEmpty = links.some((link) => link.trim() === "");
    if (hasEmpty) {
      setErrors((prev) => ({
        ...prev,
        links: t("contractDetail.deliverableDetail.form.links.addLinkError"),
      }));
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
      newErrors.note = t("contractDetail.deliverableDetail.form.note.error");
    }
    const safeLinks = links.filter((link) => link.trim() !== "");

    if (safeLinks.length === 0) {
      newErrors.links = t(
        "contractDetail.deliverableDetail.form.links.requiredError",
      );
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
      <h1 className={styles.formTitle}>
        {t("contractDetail.deliverableDetail.form.title")}
      </h1>
      <p className={styles.clarificationInfo}>
        <span>{t("contractDetail.deliverableDetail.form.description")}</span>
      </p>

      <div className={styles.submissionNoteBox}>
        <label className={styles.label}>
          {t("contractDetail.deliverableDetail.form.note.label")}
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t(
            "contractDetail.deliverableDetail.form.note.placeholder",
          )}
          minLength={10}
        ></textarea>
        {errors.note && <p className={styles.error}>{errors.note}</p>}
      </div>
      <div className={styles.inputBox}>
        <label className={styles.label}>
          {t("contractDetail.deliverableDetail.form.links.label")}
        </label>
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
            {t("contractDetail.deliverableDetail.form.actions.submit")}
          </button>
        </div>
        <div className={styles.addLinkBtn} onClick={handleAddLink}>
          <FaPlus />
          <span>
             {t("contractDetail.deliverableDetail.form.actions.addLink")}
          </span>
        </div>
      </div>
    </form>
  );
}

export default SubmitDeliverableForm;
