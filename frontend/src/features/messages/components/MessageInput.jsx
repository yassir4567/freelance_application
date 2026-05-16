import styles from "../styles/MessageInput.module.css";
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import { useState } from "react";
import { sendMessage } from "../../../api/messages/sendMessage";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MessageInput({ setMessages }) {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");

  const [params] = useSearchParams();

  const conversationId = params.get("chat") ?? null;

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    const result = await sendMessage(conversationId, message);

    if (result.success) {
      setMessages((prev) => [...prev, result.data]);
    }

    setMessage("");
  };

  return (
    <form onSubmit={handleSendMessage} className={styles.sendInputSection}>
      <div className={styles.sendInput}>
        <input
          type="text"
          className={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("messages.inputPlaceholder")}
        />
        {/* <ImAttachment className={styles.attachIcon} /> */}
      </div>
      <button type="submit" className={styles.sendButton}>
        <div className={styles.fillSend}>
          <IoSend className={styles.fillSendIcon} />
        </div>
      </button>
    </form>
  );
}

export default MessageInput;
