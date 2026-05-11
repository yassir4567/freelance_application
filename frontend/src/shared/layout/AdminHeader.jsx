import { FiShield } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import styles from "./AdminHeader.module.css";

function AdminHeader() {
  const { user } = useAuth();
  const fullName = getFullName(user);
  const initial = fullName.charAt(0).toUpperCase();

  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Admin panel</p>
        <h2>Welcome back, {fullName}</h2>
      </div>

      <div className={styles.profile}>
        <span className={styles.role}>
          <FiShield />
          Admin
        </span>

        <div className={styles.user}>
          <div className={styles.avatar}>{initial}</div>
          <div>
            <strong>{fullName}</strong>
            <span>{user?.email || "admin account"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function getFullName(user) {
  if (!user) {
    return "Admin";
  }

  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");

  return name || user.name || "Admin";
}

export default AdminHeader;
