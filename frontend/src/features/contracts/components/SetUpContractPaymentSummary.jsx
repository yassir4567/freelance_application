import styles from "../styles/SetUpContractPaymentSummary.module.css";
import { useTranslation } from "react-i18next";

function SetUpContractPaymentSummary({ final_price, totalDeliverablesAmount }) {
  const { t } = useTranslation();
  const remaining = Number(final_price) - Number(totalDeliverablesAmount) || 0;

  return (
    <div className={styles.summary}>
      <h1 className={styles.title}>{t("setUpContract.paymentSummary.title")}</h1>
      <div className={styles.container}>
        <p className={styles.box}>
          <span className={styles.label}>{t("setUpContract.setUpForm.form.price.label")}</span>
          <span className={styles.price}>$ {final_price || 0}</span>
        </p>
        <p className={styles.box}>
          <span className={styles.label}>{t("ui.labels.allocated")}</span>
          <span className={styles.price}>$ {totalDeliverablesAmount || 0}</span>
        </p>
        <p className={styles.box}>
          <span className={styles.label}>{t("ui.labels.remaining")}</span>
          <span
            className={styles.price}
            style={{ color: remaining < 0 && "red" }}
          >
            $ {remaining}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SetUpContractPaymentSummary;
