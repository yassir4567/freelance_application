import styles from "./SimpleCard.module.css";
function SimpleCard({
  title,
  value = null,
  description = null,
  icon,
  className = "",
}) {
  return (
    <div className={`${styles.card} ${className}`}>
      {(icon || title) && (
        <div className={styles.cardHeader}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {title && <h3 className={styles.title}>{title}</h3>}
        </div>
      )}

      {value !== null && <p className={styles.value}>{value}</p>}

      {description !== null && (
        <p className={styles.description}>{description}</p>
      )}
    </div>
  );
}

export default SimpleCard;
