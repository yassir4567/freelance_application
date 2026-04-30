import ChatItem from "./ChatItem";
import styles from "../styles/ChatList.module.css";
import ChatListHeader from "./ChatListHeader";
import profile from "../../../assets/images/profile.png";

function ChatList({ conversations }) {
  return (
    <div className={styles.chatList}>
      <ChatListHeader />
      <div className={styles.chatListContainer}>
        {conversations.map((conversation) => (
          <ChatItem key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
