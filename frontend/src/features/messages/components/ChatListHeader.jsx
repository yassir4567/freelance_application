import styles from "../styles/ChatListHeader.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function ChatListHeader({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <header className={styles.chatListHeader}>
      <div className={styles.headerMain}>
        <h1 className={styles.headerTitle}>{t("messages.title")}</h1>
        <div className={styles.selectBox}>
          <select name="contract_stats" value={value} onChange={onChange}>
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      <hr className={styles.devider} />
    </header>
  );
}

export default ChatListHeader;
