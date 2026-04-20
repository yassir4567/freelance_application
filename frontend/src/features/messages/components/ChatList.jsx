import ChatItem from "./ChatItem";
import styles from "../styles/ChatList.module.css";
import ChatListHeader from "./ChatListHeader";
import profile from "../../../assets/images/profile.png";

function ChatList() {
  const chats = [
    {
      id: 1,
      name: "freelancer 1",
      lastMessage: "last message 1",
      unreadCount: 3,
      avatar : profile
    },
    {
      id: 2,
      name: "freelancer 2",
      lastMessage: "last message 2",
      unreadCount: 3,
      avatar : profile
    },
    {
      id: 3,
      name: "freelancer 3",
      lastMessage: "last message 3",
      unreadCount: 4,
      avatar : profile
    },
    {
      id: 4,
      name: "freelancer 4",
      lastMessage: "last message 3",
      unreadCount: 4,
      avatar : profile
    },
    {
      id: 5,
      name: "freelancer 5",
      lastMessage: "last message 3",
      unreadCount: 4,
      avatar : profile
    },
    {
      id: 6,
      name: "freelancer 6",
      lastMessage: "last message 3",
      unreadCount: 4,
      avatar : profile
    },
    {
      id: 7,
      name: "freelancer 7",
      lastMessage: "last message 3",
      unreadCount: 1,
      avatar : profile
    },
  ];

  return (
    <div className={styles.chatList}>
      <ChatListHeader />
      <div className={styles.chatListContainer}>
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
