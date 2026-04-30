import styles from "../styles/ChatListHeader.module.css";
import { IoSearchOutline } from "react-icons/io5";

function ChatListHeader() {
  return (
    <header className={styles.chatListHeader}>
      <h1 className={styles.headerTitle}>Chats</h1>
      {/* <div className={styles.searchBox}>
        <IoSearchOutline className={styles.searchIcon} />
        <input type="text" placeholder="Search by name ..." />
      </div> */}
      <hr className={styles.devider} />
    </header>
  );
}

export default ChatListHeader;
