import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import styles from "../../styles/ProfileInformation.module.css";

function ProfileInformation() {
  const { user, isLoading } = useAuth();

  console.log(user);

  const [form, setForm] = useState({
    first_name: user.first_name || "Unregistered",
    last_name: user.last_name || "Unregistered",
    phone: user.phone || "Unregistered",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <div>Loading</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Personal information</h2>

      <form>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>First name</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleOnChange}
              disabled
            />
          </div>
          <div className={styles.inputBox}>
            <label>Last name</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleOnChange}
              disabled
            />
          </div>
          <div className={styles.inputBox}>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleOnChange}
              disabled
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileInformation;
