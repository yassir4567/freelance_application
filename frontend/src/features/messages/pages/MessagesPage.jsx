import { useEffect, useMemo, useState } from "react";
import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages";
import styles from "../styles/MessagesPage.module.css";
import { getConversations } from "../../../api/messages/getConversations";
import { useSearchParams } from "react-router-dom";

function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [queryParams, setQueryParams] = useSearchParams();
  const conversationId = queryParams.get("chat") || "";
  const contract_status = queryParams.get("status") || "all";


  useEffect(() => {
    const loadConversations = async () => {
      const result = await getConversations(contract_status);
      setConversations(result.data);
    };
    loadConversations();
  }, [contract_status]);

  const handleOpenConversation = (id) => {
    const params = new URLSearchParams(queryParams);
    params.set("chat", id);
    setQueryParams(params);
  };

  const handleChangeContractStatus = (e) => {
    const params = new URLSearchParams(queryParams);

    if (e.target.value === "") {
      params.delete("status");
    } else {
      params.set("status", e.target.value);
    }
    setQueryParams(params);
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
          onChange={handleChangeContractStatus}
          value={contract_status}
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
