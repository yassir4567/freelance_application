import styles from "../styles/MessagesHeader.module.css";
import profile from "../../../assets/images/profile.png";
import { CgMenuMotion } from "react-icons/cg";
function MessagesHeader({ other_user }) {
  return (
    <div className={styles.messagesHeader}>
      <div className={styles.leftHeader}>
        <img className={styles.avatar} src={profile} alt="avatar" />
        <h3 className={styles.name}>
          {other_user.first_name} {other_user.last_name}
        </h3>
      </div>

      <div className={styles.rightHeader}>
        <CgMenuMotion className={styles.menuIcon} />
      </div>
    </div>
  );
}

export default MessagesHeader;
