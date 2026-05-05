import { useEffect, useState } from "react";
import styles from "../../styles/AboutMe.module.css";
import { getCategories } from "../../../../api/categories/getCategories";

function AboutMe({ isEdited, form, setForm }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const result = await getCategories();
      if (result.success) {
        setCategories(result.data);
      }
    };
    loadCategories();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>About Me</h2>

      <div>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleOnChange}
              placeholder="Unregistered"
              disabled={!isEdited}
            />
          </div>
          <div className={styles.inputBox}>
            <label>Protfolio link</label>
            <input
              type="url"
              name="portfolio"
              value={form.portfolio}
              onChange={handleOnChange}
              placeholder="Unregistered"
              disabled={!isEdited}
            />
          </div>
          <div className={styles.inputBox}>
            <label>Category</label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleOnChange}
              disabled={!isEdited}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.bioRow}>
          <div className={styles.textareaBox}>
            <label>Bio</label>
            <textarea
              type="text"
              name="bio"
              value={form.bio}
              onChange={handleOnChange}
              placeholder="Unregistered"
              disabled={!isEdited}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
