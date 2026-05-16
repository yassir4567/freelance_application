import styles from "./ProfileMenu.module.css";
import { FaRegUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

function ProfileMenu({ onClose }) {
  const { logout } = useAuth();
  const { t } = useTranslation();
  const handleLogout = async (e) => {
    await logout();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile_menu}>
        <NavLink to="profile" className={styles.btn} onClick={onClose}>
          <FaRegUser /> <span>{t("ui.labels.freelancerProfile")}</span>
        </NavLink>
        <hr />
        <button onClick={handleLogout} className={styles.btn}>
          <RiLogoutCircleRLine color="red" />{" "}
          <span>{t("ui.actions.logout")}</span>
        </button>
      </div>
    </div>
  );
}

export default ProfileMenu;
