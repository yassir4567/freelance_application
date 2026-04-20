import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages";
import styles from "../styles/MessagesPage.module.css";
function MessagesPage() {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatListContainer}>
        <ChatList />
      </div>
      <div className={styles.chatMessagesContainer}>
        <ChatMessages />
      </div>
    </div>
  );
}

export default MessagesPage;
