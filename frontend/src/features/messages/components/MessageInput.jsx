import styles from "../styles/MessageInput.module.css";
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";

function MessageInput() {
  return (
    <div className={styles.sendInputSection}>
      <div className={styles.sendInput}>
        <input type="text" className={styles.input} placeholder="Type a message ..." />
        <ImAttachment className={styles.attachIcon} />
      </div>
      <div className={styles.sendButton}>
        <div className={styles.fillSend}>
            <IoSend className={styles.fillSendIcon} />
        </div>
      </div>
    </div>
  );
}

export default MessageInput;
