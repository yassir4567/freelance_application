import { useEffect, useState } from "react";
import { addCategory } from "../../../api/admin/addCategory";
import { getAdminCategories } from "../../../api/admin/getCategories";
import styles from "../styles/AdminCategoriesPage.module.css";

function AdminCategoriePage() {
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

      const result = await getAdminCategories();

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
      setError("Category name is required");
      return;
    }

    setSaving(true);

    const result = await addCategory(name.trim());

    if (result.success) {
      setCategories((currentCategories) => [result.data, ...currentCategories]);
      setName("");
      setShowForm(false);
      setSuccessMessage("Category added successfully");
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
          <p className={styles.subtitle}>Admin dashboard</p>
          <h1>Categories</h1>
        </div>

        <button
          type="button"
          className={styles.addBtn}
          onClick={() => setShowForm((currentValue) => !currentValue)}
        >
          {showForm ? "Close" : "Add category"}
        </button>
      </div>

      <div className={styles.summary}>
        <span>Total categories</span>
        <strong>{categories.length}</strong>
      </div>

      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="category-name">Category name</label>
            <input
              id="category-name"
              type="text"
              placeholder="Example: Web Development"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? "Saving..." : "Save category"}
          </button>
        </form>
      )}

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      {loading ? (
        <p className={styles.state}>Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className={styles.state}>No categories found.</p>
      ) : (
        <div className={styles.tableBox}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
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
