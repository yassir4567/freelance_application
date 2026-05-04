import styles from "../../styles/ProfileCard.module.css";
import profile from "../../../../assets/images/profile.png";

function ProfileCard() {
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
          <h3 className={styles.name}>Full Name</h3>
          <p className={styles.email}>fullname@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
