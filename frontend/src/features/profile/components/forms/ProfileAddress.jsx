import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import styles from "../../styles/ProfileAddress.module.css";

function ProfileAddress() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    address: user.address || "Unregistered",
    country: user.country || "Unregistered",
    city: user.city || "Unregistered",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Address informations</h2>

      <form>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleOnChange}
              disabled
            />
          </div>
          <div className={styles.inputBox}>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleOnChange}
              disabled
            />
          </div>
          <div className={styles.inputBox}>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleOnChange}
              disabled
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileAddress;
