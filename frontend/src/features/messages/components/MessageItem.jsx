import { formatDate } from "../../../utils/helpers";
import styles from "../styles/MessageItem.module.css";

function MessageItem({ message, dir }) {
  return (
    <div
      className={`${styles.messageItem} ${dir === "from" ? styles.from : styles.to}`}
    >
      <p className={styles.message}>{message.message}</p>
      <p className={styles.date}>{formatDate(message.created_at)}</p>
    </div>
  );
}

export default MessageItem;
