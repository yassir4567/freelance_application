import { NavLink } from "react-router-dom";
import styles from "../styles/ClientActiveContractHeader.module.css";
import { formatStatusLabel, getStatusClass } from "../utils/contractDisplay";
import { useAuth } from "../../../context/AuthContext";
import { CONTRACT_STATUS_CLASS } from "../utils/contractDisplay";
import { FiArrowLeft } from "react-icons/fi";
import profile from "../../../assets/images/profile.png";
import { useTranslation } from "react-i18next";

function ClientActiveContractHeader({ role, contractInfo, freelancerInfo }) {
  const { t } = useTranslation();
  const fullName = freelancerInfo.first_name + " " + freelancerInfo.last_name;
  const freelancerTitle = freelancerInfo.title;

  return (
    <div className={styles.header}>
      <div className={styles.heroGlow}></div>
      <div className={styles.headerTop}>
        <NavLink
          to={`/dashboard/${role}/contracts`}
          className={styles.backLink}
        >
          <FiArrowLeft />
          <span>{t("common.actions.backToContracts")}</span>
        </NavLink>

        <div
          className={`${styles.status} ${getStatusClass(CONTRACT_STATUS_CLASS, contractInfo.contractStatus)}`}
        >
          {formatStatusLabel(contractInfo.contractStatus, "")}
        </div>
      </div>

      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <p className={styles.eyebrow}>
            {t("common.labels.contractSetup")}
          </p>
          <h1 className={styles.headerTitle}>{contractInfo.projectTitle}</h1>
          <p className={styles.headerSubtitle}>
            {t("setUpContract.header.description")}
          </p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.freelancerCard}>
            <h5 className={styles.cardSubTitle}>freelancer</h5>
            <div className={styles.mainCard}>
              <img src={profile} className={styles.cardAvatar} alt="avater" />
              <div className={styles.cardContent}>
                <h4 className={styles.freelancerFullName}>{fullName}</h4>
                <p className={styles.freelancerTitle}>{freelancerTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientActiveContractHeader;
