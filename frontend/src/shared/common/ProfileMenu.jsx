import styles from "./ProfileMenu.module.css";
import { FaRegUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function ProfileMenu({ onClose , logout }) {

  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile_menu}>
        <NavLink to="profile" className={styles.btn} onClick={onClose}>
          <FaRegUser /> <span>{t("ui.labels.freelancerProfile")}</span>
        </NavLink>
        <hr />
        <button onClick={logout} className={styles.btn}>
          <RiLogoutCircleRLine color="red" />{" "}
          <span>{t("ui.actions.logout")}</span>
        </button>
      </div>
    </div>
  );
}

export default ProfileMenu;
