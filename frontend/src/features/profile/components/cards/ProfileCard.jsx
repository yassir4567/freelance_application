import styles from "../../styles/ProfileCard.module.css";
import profile from "../../../../assets/images/profile.png";
import { useAuth } from "../../../../context/AuthContext";

function ProfileCard() {
  const { user } = useAuth();


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageBox}>
            <div className={styles.image}>
              <img src={profile} alt="Profile image" />
            </div>
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
