import ProfileAddress from "../components/forms/ProfileAddress";
import ProfileInformation from "../components/forms/ProfileInformation";
import ProfileSideBar from "../components/ProfileSideBar";
import styles from "../styles/ProfilePage.module.css";
function ProfilePage() {
  return (
    <div className={styles.profilePage}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Profile information</h2>
        <button className={styles.editButton}>Edit profile</button>
      </div>

      <div className={styles.main}>
        <ProfileInformation />
        <ProfileAddress />
      </div>
    </div>
  );
}

export default ProfilePage;
