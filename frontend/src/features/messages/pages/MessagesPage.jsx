import { useEffect, useMemo, useState } from "react";
import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages";
import styles from "../styles/MessagesPage.module.css";
import { getConversations } from "../../../api/messages/getConversations";
import { useSearchParams } from "react-router-dom";

function MessagesPage() {
  const [conversations, setConversations] = useState([]);

  const [params, setParams] = useSearchParams();

  const conversationId = params.get("chat") || "";

  useEffect(() => {
    const loadConversations = async () => {
      const result = await getConversations();
      setConversations(result.data);
    };
    loadConversations();
  }, []);

  const handleOpenConversation = (id) => {
    setParams({ chat: id });
  };

  const conversationIds = conversations.map((cnv) => cnv.id);

  const currentConversation = conversations.filter(
    (cnv) => cnv.id === +conversationId,
  )[0];

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatListContainer}>
        <ChatList
          conversations={conversations}
          handleOpenConversation={handleOpenConversation}
        />
      </div>
      <div className={styles.chatMessagesContainer}>
        {conversationId !== "" && conversationIds.includes(+conversationId) ? (
          <ChatMessages conversation={currentConversation} />
        ) : (
          <div className={styles.select_conv}>
            <p>Select Conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;
