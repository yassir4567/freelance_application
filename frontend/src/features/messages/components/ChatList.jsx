import ChatItem from "./ChatItem";
import styles from "../styles/ChatList.module.css";
import ChatListHeader from "./ChatListHeader";
import profile from "../../../assets/images/profile.png";

function ChatList({ conversations, handleOpenConversation , value , onChange }) {
  return (
    <div className={styles.chatList}>
      <ChatListHeader value={value} onChange={onChange} />
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
