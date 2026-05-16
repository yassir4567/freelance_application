import styles from "../styles/ProfileSideBar.module.css";
import ProfileCard from "./cards/ProfileCard";

function ProfileSideBar({ setAvatar, preview, setPreview, isEdited }) {
  return (
    <div>
      <div className={styles.profileCard}>
        <ProfileCard
          setAvatar={setAvatar}
          preview={preview}
          setPreview={setPreview}
          isEdited={isEdited}
        />
      </div>
    </div>
  );
}

export default ProfileSideBar;
