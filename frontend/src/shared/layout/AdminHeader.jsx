import { FiShield } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import styles from "./AdminHeader.module.css";
import { useTranslation } from "react-i18next";

function AdminHeader() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const fullName = getFullName(user);
  const initial = fullName.charAt(0).toUpperCase();

  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>{t("ui.labels.adminPanel")}</p>
        <h2>{t("common.labels.welcome")} {fullName}</h2>
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
            <span>{user?.email || t("ui.labels.adminAccount")}</span>
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
