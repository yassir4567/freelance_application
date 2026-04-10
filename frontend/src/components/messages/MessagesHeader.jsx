import styles from "./MessagesHeader.module.css";
import profile from "../../assets/images/profile.png";
import { CgMenuMotion } from "react-icons/cg";
function MessagesHeader() {
  return (
    <div className={styles.messagesHeader}>
      <div className={styles.leftHeader}>
        <img className={styles.avatar} src={profile} alt="avatar" />
        <h3 className={styles.name}>Freelancer name</h3>
      </div>

      <div className={styles.rightHeader}>
        <CgMenuMotion className={styles.menuIcon} />
      </div>
    </div>
  );
}

export default MessagesHeader;
