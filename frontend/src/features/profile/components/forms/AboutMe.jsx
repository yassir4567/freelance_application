import styles from "../../styles/AboutMe.module.css";

function AboutMe({ isEdited, form, setForm }) {
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
