import { NavLink } from "react-router-dom";
import styles from "./CompleteProfileAlert.module.css";

function CompleteProfileAlert() {
  return (
    <div className={styles.alertBox}>
      <div className={styles.completeMsgs}>
        <h3 className={styles.title}>
          Complete your profile
        </h3>
        <p className={styles.description}>
          A complete profile helps clients trust you faster
        </p>
      </div>
      <div className={styles.linkBox}>
        <NavLink className={styles.link}>
            Complete profile
        </NavLink>
      </div>

    </div>
  );
}

export default CompleteProfileAlert;
