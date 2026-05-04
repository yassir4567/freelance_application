import styles from "../styles/ProfileSideBar.module.css";
import ProfileCard from "./cards/ProfileCard";

function ProfileSideBar() {
  return (
    <div>
      <div className={styles.profileCard}>
        <ProfileCard />
      </div>
    </div>
  );
}

export default ProfileSideBar;
