import { useEffect, useRef } from "react";
import styles from "../styles/ChatMessages.module.css";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import MessagesHeader from "./MessagesHeader";

function ChatMessages({ conversation }) {
  const messagesRef = useRef(null);

  useEffect(() => {
    const box = messagesRef.current;
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
  }, []);
  return (
    <div className={styles.chatMessages}>
      <div className={styles.messagesHeader}>
        <MessagesHeader />
      </div>
      <div ref={messagesRef} className={styles.messagesContent}>
        <div className={styles.messagesList}>
          <MessageItem dir="from" />
          <MessageItem dir="from" />
          <MessageItem dir="to" />
          <MessageItem dir="from" />
          <MessageItem dir="to" />
          <MessageItem dir="to" />
          <MessageItem dir="from" />
          <MessageItem dir="to" />
          <MessageItem dir="from" />
        </div>
      </div>
      <div className={styles.messagesInput}>
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatMessages;
