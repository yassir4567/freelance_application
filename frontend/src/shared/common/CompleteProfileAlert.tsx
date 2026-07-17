import { NavLink } from "react-router-dom";
import styles from "./CompleteProfileAlert.module.css";
import { useTranslation } from "react-i18next";
import type { Role } from "../../types/user.types";

type CompleteProfileAlertProps = {
  role: Role;
};

function CompleteProfileAlert({ role }: CompleteProfileAlertProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.alertBox}>
      <div className={styles.completeMsgs}>
        <h3 className={styles.title}>{t("profile.complete.title")}</h3>
        <p className={styles.description}>
          {t("profile.complete.description")}
        </p>
      </div>
      <div className={styles.linkBox}>
        <NavLink
          to={`/dashboard/${role}/profile`}
          className={styles.link ?? ""}
        >
          {t("ui.actions.completeProfile")}
        </NavLink>
      </div>
    </div>
  );
}

export default CompleteProfileAlert;
