import { useEffect, useState } from "react";
import styles from "../styles/AdminCategoriesPage.module.css";
import { useTranslation } from "react-i18next";
import { categoryApi } from "../../../api/categories/categoryApi";

function AdminCategoriePage() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      setError("");

      const result = await categoryApi.getCategoriesForAdmin();

      if (result.success) {
        setCategories(result.data);
      } else {
        setCategories([]);
        setError(result.message);
      }

      setLoading(false);
    };

    loadCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!name.trim()) {
      setError(t("ui.validation.categoryNameRequired"));
      return;
    }

    setSaving(true);

    const payload = { name };

    const result = await categoryApi.addCategory(payload);

    if (result.success) {
      setCategories((currentCategories) => [result.data, ...currentCategories]);
      setName("");
      setShowForm(false);
      setSuccessMessage(t("admin.categories.success"));
    } else {
      const validationMessage = result.errors?.name?.[0];
      setError(validationMessage || result.message);
    }

    setSaving(false);
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div>
          <p className={styles.subtitle}>{t("ui.labels.adminDashboard")}</p>
          <h1>{t("admin.categories.title")}</h1>
        </div>

        <button
          type="button"
          className={styles.addBtn}
          onClick={() => setShowForm((currentValue) => !currentValue)}
        >
          {showForm ? t("ui.actions.close") : t("ui.actions.addCategory")}
        </button>
      </div>

      <div className={styles.summary}>
        <span>{t("ui.labels.totalCategories")}</span>
        <strong>{categories.length}</strong>
      </div>

      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="category-name">{t("admin.categories.label")}</label>
            <input
              id="category-name"
              type="text"
              placeholder={t("admin.categories.placeholder")}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? t("ui.actions.saving") : t("ui.actions.saveCategory")}
          </button>
        </form>
      )}

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      {loading ? (
        <p className={styles.state}>{t("ui.states.loadingCategories")}</p>
      ) : categories.length === 0 ? (
        <p className={styles.state}>{t("ui.states.noCategoriesFound")}</p>
      ) : (
        <div className={styles.tableBox}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>{t("ui.labels.name")}</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>#{category.id}</td>
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminCategoriePage;
