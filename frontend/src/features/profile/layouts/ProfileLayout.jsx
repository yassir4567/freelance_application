import { Outlet } from "react-router-dom";
import ProfileSideBar from "../components/ProfileSideBar";
import styles from "../styles/ProfileLayout.module.css";

function ProfileLayout() {
  return (
    <div className={styles.profileLayout}>
      <div className={styles.profileSideBar}>
        <ProfileSideBar />
      </div>

      <div className={styles.profileOutlet}>
        <div className={styles.outletWrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
