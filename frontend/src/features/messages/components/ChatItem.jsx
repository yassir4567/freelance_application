import styles from "../styles/ChatItem.module.css";

function ChatItem({ chat }) {
  return (
    <div className={styles.chatItem}>
      <div className={styles.chatItem_content}>
        <img className={styles.chatItem_avatar} src={chat.avatar} alt="chat avatar" />
        <div className={styles.chatItem_info}>
          <h3 className={styles.chatItem_name}>{chat.name}</h3>
          <p className={styles.chatItem_lastMessage}>{chat.lastMessage}</p>
        </div>
      </div>
      <div className={styles.chatItem_unread}>{chat.unreadCount}</div>
    </div>
  );
}

export default ChatItem;
