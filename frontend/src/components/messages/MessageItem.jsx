import styles from "./MessageItem.module.css";

function MessageItem({ dir }) {
  return (
    <div
      className={`${styles.messageItem} ${dir === "from" ? styles.from : styles.to}`}
    >
      <p className={styles.message}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        sint minus ipsam ratione sunt! Ullam, laborum voluptate delectus
        consectetur similique nostrum perferendis dignissimos ea omnis
        praesentium corporis? Et, quis! Natus!
      </p>
      <p className={styles.date}>Nov 15 , 2025</p>
    </div>
  );
}

export default MessageItem;
