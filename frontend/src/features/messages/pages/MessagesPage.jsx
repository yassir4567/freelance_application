import { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages";
import styles from "../styles/MessagesPage.module.css";
import { getConversations } from "../../../api/messages/getConversations";
function MessagesPage() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const loadConversations = async () => {
      const result = await getConversations();
      setConversations(result.data);
    };
    loadConversations();
  }, []);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatListContainer}>
        <ChatList conversations={conversations} />
      </div>
      <div className={styles.chatMessagesContainer}>
        <ChatMessages />
      </div>
    </div>
  );
}

export default MessagesPage;
