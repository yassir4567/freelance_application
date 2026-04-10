import styles from "./ProfileMenu.module.css";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

function ProfileMenu() {
  return (
    <div className={styles.profile_menu}>
      <NavLink className={styles.btn}>
        <FaUserAlt color="green" /> <span>Profile</span>
      </NavLink>
      <hr />
      <button className={styles.btn}>
        <RiLogoutCircleRLine color="red" /> <span>Logout</span>
      </button>
    </div>
  );
}

export default ProfileMenu;
