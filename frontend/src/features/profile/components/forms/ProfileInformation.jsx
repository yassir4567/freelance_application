import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import styles from "../../styles/ProfileInformation.module.css";

function ProfileInformation({ isEdited, form, setForm }) {
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Personal information</h2>

      <div>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>First name</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleOnChange}
              disabled={!isEdited}
            />
          </div>
          <div className={styles.inputBox}>
            <label>Last name</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleOnChange}
              disabled={!isEdited}
            />
          </div>
          <div className={styles.inputBox}>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleOnChange}
              disabled={!isEdited}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInformation;
