import { useEffect, useMemo, useState } from "react";
import styles from "../styles/AdminSkillsPage.module.css";
import { useTranslation } from "react-i18next";
import { skillApi } from "../../../api/skills/skillApi";

function AdminSkillsPage() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [skillName, setSkillName] = useState("");
  const [pendingSkills, setPendingSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);
      setError("");

      const result = await skillApi.getCategorySkills();

      if (result.success) {
        setCategories(result.data);
      } else {
        setCategories([]);
        setError(result.message);
      }

      setLoading(false);
    };

    loadSkills();
  }, []);

  const totalSkills = useMemo(() => {
    return categories.reduce((total, category) => {
      return total + (category.skills_count || category.skills?.length || 0);
    }, 0);
  }, [categories]);

  const handleAddSkill = () => {
    setError("");
    setSuccessMessage("");

    const newSkill = skillName.trim();

    if (!newSkill) {
      setError(t("ui.validation.skillNameRequired"));
      return;
    }

    const isAlreadyAdded = pendingSkills.some(
      (skill) => skill.toLowerCase() === newSkill.toLowerCase(),
    );

    if (isAlreadyAdded) {
      setError(t("ui.validation.skillAlreadyAdded"));
      return;
    }

    setPendingSkills((currentSkills) => [...currentSkills, newSkill]);
    setSkillName("");
  };

  const handleRemoveSkill = (selectedSkill) => {
    setPendingSkills((currentSkills) =>
      currentSkills.filter((skill) => skill !== selectedSkill),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!categoryId) {
      setError(t("ui.validation.chooseCategory"));
      return;
    }

    if (pendingSkills.length === 0) {
      setError(t("ui.validation.addAtLeastOneSkill"));
      return;
    }

    setSaving(true);

    const payload = {
      category_id: categoryId,
      skills: pendingSkills,
    };
    const result = await skillApi.addSkills(payload);

    if (result.success) {
      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category.id === result.data.id ? result.data : category,
        ),
      );
      setCategoryId("");
      setSkillName("");
      setPendingSkills([]);
      setShowForm(false);
      setSuccessMessage(t("admin.skills.success"));
    } else {
      const validationMessage =
        result.errors?.category_id?.[0] || result.errors?.skills?.[0];
      setError(validationMessage || result.message);
    }

    setSaving(false);
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div>
          <p className={styles.subtitle}>{t("ui.labels.adminDashboard")}</p>
          <h1>{t("admin.skills.title")}</h1>
        </div>

        <button
          type="button"
          className={styles.addBtn}
          onClick={() => setShowForm((currentValue) => !currentValue)}
        >
          {showForm ? t("ui.actions.close") : t("ui.actions.addSkills")}
        </button>
      </div>

      <div className={styles.summaryGrid}>
        <div className={styles.summary}>
          <span>{t("admin.categories.title")}</span>
          <strong>{categories.length}</strong>
        </div>
        <div className={styles.summary}>
          <span>{t("ui.labels.totalSkills")}</span>
          <strong>{totalSkills}</strong>
        </div>
      </div>

      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <div>
              <h2>{t("admin.skills.formTitle")}</h2>
              <p>{t("admin.skills.formDescription")}</p>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.field}>
              <label htmlFor="category">{t("common.labels.category")}</label>
              <select
                id="category"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
              >
                <option value="">{t("admin.skills.chooseCategory")}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="skill">{t("common.labels.skills")}</label>
              <input
                id="skill"
                type="text"
                placeholder={t("admin.skills.skillPlaceholder")}
                value={skillName}
                onChange={(event) => setSkillName(event.target.value)}
              />
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={handleAddSkill}
              >
                {t("ui.actions.addSkill")}
              </button>

              <button
                type="submit"
                className={styles.saveBtn}
                disabled={saving}
              >
                {saving ? t("ui.actions.saving") : t("ui.actions.save")}
              </button>
            </div>
          </div>

          <div className={styles.pendingPanel}>
            <div className={styles.pendingHeader}>
              <span>{t("admin.skills.pendingTitle")}</span>
              <strong>{pendingSkills.length}</strong>
            </div>

            <div className={styles.pendingBox}>
              {pendingSkills.length === 0 ? (
                <p>{t("ui.states.noSkillsAdded")}</p>
              ) : (
                pendingSkills.map((skill) => (
                  <span key={skill}>
                    {skill}
                    <button
                      type="button"
                      aria-label={t("ui.actions.removeItem", { item: skill })}
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      x
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        </form>
      )}

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      {loading ? (
        <p className={styles.state}>{t("ui.states.loadingSkills")}</p>
      ) : categories.length === 0 ? (
        <p className={styles.state}>{t("ui.states.noCategoriesFound")}</p>
      ) : (
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <article key={category.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>{category.name}</h2>
                <span>
                  {t("ui.labels.skillsCount", {
                    count:
                      category.skills_count || category.skills?.length || 0,
                  })}
                </span>
              </div>

              {category.skills?.length > 0 ? (
                <div className={styles.skills}>
                  {category.skills.map((skill) => (
                    <span key={skill.id}>{skill.name}</span>
                  ))}
                </div>
              ) : (
                <p className={styles.empty}>{t("ui.states.noSkillsAdded")}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminSkillsPage;
