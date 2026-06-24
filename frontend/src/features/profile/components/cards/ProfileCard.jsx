import styles from "../../styles/ProfileCard.module.css";
import profile from "../../../../assets/images/profile.png";
import { useAuth } from "../../../../context/AuthContext";
import { useTranslation } from "react-i18next";

function ProfileCard({ setAvatar, preview, setPreview, isEdited }) {
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const avatar = e.target.files[0];
    setAvatar(avatar);
    setPreview(URL.createObjectURL(avatar));
  };  

  const src = preview ? preview : user.avatar_url ? user.avatar_url : profile;

  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageBox}>
            <label htmlFor="avatar" className={styles.image}>
              <img src={src} alt={t("ui.labels.profile")} />
            </label>
            {isEdited && (
              <input
                id="avatar"
                type="file"
                accept="image/*"
                name="avatar"
                onChange={handleChange}
                className={styles.avatar}
              />
            )}
          </div>
        </div>

        <div className={styles.userInfo}>
          <h3 className={styles.name}>
            {user.first_name} {user.last_name}
          </h3>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
