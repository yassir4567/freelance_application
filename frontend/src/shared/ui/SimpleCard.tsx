import type React from "react";
import styles from "./SimpleCard.module.css";

type SimpleCardProps = {
  title?: string;
  value?: string | number | null;
  description?: string | null;
  icon?: React.ReactNode;
  className?: string;
};

function SimpleCard({
  title,
  value = null,
  description = null,
  icon,
  className = "",
}: SimpleCardProps) {
  return (
    <div className={`${className} ${styles.card}`}>
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
