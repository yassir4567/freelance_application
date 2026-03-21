import styles from "./ProfileMenu.module.css";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

function ProfileMenu() {
  return (
    <div className={styles.profile_menu}>
      <button>
        <FaUserAlt color="green" /> <span>Profile</span>
      </button>
      <hr />
      <button>
        <RiLogoutCircleRLine color="red" /> <span>Logout</span>
      </button>
    </div>
  );
}

export default ProfileMenu;
