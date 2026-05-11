import { useEffect, useMemo, useState } from "react";
import { addSkills } from "../../../api/admin/addSkills";
import { getCategorySkills } from "../../../api/admin/getCategorySkills";
import styles from "../styles/AdminSkillsPage.module.css";

function AdminSkillsPage() {
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

      const result = await getCategorySkills();

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
      setError("Please enter a skill name first");
      return;
    }

    const isAlreadyAdded = pendingSkills.some(
      (skill) => skill.toLowerCase() === newSkill.toLowerCase(),
    );

    if (isAlreadyAdded) {
      setError("This skill is already in the list");
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
      setError("Please choose a category");
      return;
    }

    if (pendingSkills.length === 0) {
      setError("Please add at least one skill");
      return;
    }

    setSaving(true);

    const result = await addSkills({
      categoryId,
      skills: pendingSkills,
    });

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
      setSuccessMessage("Skills added successfully");
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
          <p className={styles.subtitle}>Admin dashboard</p>
          <h1>Skills</h1>
        </div>

        <button
          type="button"
          className={styles.addBtn}
          onClick={() => setShowForm((currentValue) => !currentValue)}
        >
          {showForm ? "Close" : "Add skills"}
        </button>
      </div>

      <div className={styles.summaryGrid}>
        <div className={styles.summary}>
          <span>Categories</span>
          <strong>{categories.length}</strong>
        </div>
        <div className={styles.summary}>
          <span>Total skills</span>
          <strong>{totalSkills}</strong>
        </div>
      </div>

      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <div>
              <h2>Add Skills</h2>
              <p>Choose one category, add skills one by one, then save.</p>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.field}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
              >
                <option value="">Choose category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="skill">Skill</label>
              <input
                id="skill"
                type="text"
                placeholder="Example: React"
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
                Add skill
              </button>

              <button type="submit" className={styles.saveBtn} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          <div className={styles.pendingPanel}>
            <div className={styles.pendingHeader}>
              <span>Skills to save</span>
              <strong>{pendingSkills.length}</strong>
            </div>

            <div className={styles.pendingBox}>
              {pendingSkills.length === 0 ? (
                <p>No skills added yet.</p>
              ) : (
                pendingSkills.map((skill) => (
                  <span key={skill}>
                    {skill}
                    <button
                      type="button"
                      aria-label={`Remove ${skill}`}
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
        <p className={styles.state}>Loading skills...</p>
      ) : categories.length === 0 ? (
        <p className={styles.state}>No categories found.</p>
      ) : (
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <article key={category.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>{category.name}</h2>
                <span>{category.skills_count || category.skills?.length || 0} skills</span>
              </div>

              {category.skills?.length > 0 ? (
                <div className={styles.skills}>
                  {category.skills.map((skill) => (
                    <span key={skill.id}>{skill.name}</span>
                  ))}
                </div>
              ) : (
                <p className={styles.empty}>No skills added yet.</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminSkillsPage;
