import ChatList from "../../components/messages/ChatList";
import ChatMessages from "../../components/messages/ChatMessages";
import styles from "./MessagesPage.module.css";
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
