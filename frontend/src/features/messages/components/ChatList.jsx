import ChatItem from "./ChatItem";
import styles from "../styles/ChatList.module.css";
import ChatListHeader from "./ChatListHeader";
import profile from "../../../assets/images/profile.png";

function ChatList({ conversations, handleOpenConversation }) {
  return (
    <div className={styles.chatList}>
      <ChatListHeader />
      <div className={styles.chatListContainer}>
        {conversations.map((conversation) => (
          <ChatItem
            key={conversation.id}
            conversation={conversation}
            handleOpenConversation={handleOpenConversation}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
