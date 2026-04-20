import styles from "./ProfileMenu.module.css";
import { FaRegUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

function ProfileMenu() {
  const { logout } = useAuth();
  const handleLogout = async (e) => {
    await logout();
  };

  return (
    <div className={styles.profile_menu}>
      <NavLink className={styles.btn}>
        <FaRegUser /> <span>Profile</span>
      </NavLink>
      <NavLink className={styles.btn}>
        <IoSettingsOutline /> <span>Settings</span>
      </NavLink>
      <hr />
      <button onClick={handleLogout} className={styles.btn}>
        <RiLogoutCircleRLine color="red" /> <span>Logout</span>
      </button>
    </div>
  );
}

export default ProfileMenu;
