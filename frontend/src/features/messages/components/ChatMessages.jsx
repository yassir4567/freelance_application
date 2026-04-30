import { useEffect, useRef, useState } from "react";
import styles from "../styles/ChatMessages.module.css";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import MessagesHeader from "./MessagesHeader";
import { getMessages } from "../../../api/messages/getMessages";
import { useAuth } from "../../../context/AuthContext";

function ChatMessages({ conversation }) {
  const messagesRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const { user } = useAuth();

  const other_user = conversation?.other_user;

  useEffect(() => {
    const loadMessages = async () => {
      const result = await getMessages(conversation.id);
      setMessages(result.data[0].messages);
    };

    loadMessages();
  }, [conversation]);

  useEffect(() => {
    const box = messagesRef.current;
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
  });

  return (
    <div className={styles.chatMessages}>
      <div className={styles.messagesHeader}>
        <MessagesHeader other_user={other_user} />
      </div>
      <div ref={messagesRef} className={styles.messagesContent}>
        <div className={styles.messagesList}>
          {messages.length > 0 &&
            messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                dir={user.id === message.sender_id ? "from" : "to"}
              />
            ))}
        </div>
      </div>
      <div className={styles.messagesInput}>
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatMessages;
