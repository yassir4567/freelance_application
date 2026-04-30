import styles from "../styles/ChatItem.module.css";
import profile from "../../../assets/images/profile.png";

function ChatItem({ conversation }) {
  return (
    <div className={styles.chatItem}>
      <div className={styles.chatItem_content}>
        <img
          className={styles.chatItem_avatar}
          src={profile}
          alt="chat avatar"
        />
        <div className={styles.chatItem_info}>
          <h3 className={styles.chatItem_name}>
            {conversation.other_user.first_name}{" "}
            {conversation.other_user.last_name}
          </h3>
          <p className={styles.chatItem_title}>
            {conversation.project.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
