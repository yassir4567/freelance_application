import styles from "../styles/ContractParty.module.css";
import profile from "../../../assets/images/profile.png";
import { NavLink } from "react-router-dom";
import { FiCalendar, FiClock, FiMessageCircle, FiUser } from "react-icons/fi";
import { valueOrFallback } from "../utils/contractDisplay";
import { useTranslation } from "react-i18next";

function ContractParty({ role, user, headerInfo }) {
  const { t } = useTranslation();
  const partyLabel = role === "client" ? "Freelancer" : "Client";

  return (
    <div className={styles.contractStaff}>
      <div className={styles.userMinCard}>
        <div className={styles.userMinCardBox}>
          <h2>{partyLabel}</h2>
          <div className={styles.userMinCardContent}>
            <img
              src={user?.avatar || profile}
              className={styles.userAvatar}
              alt={`${partyLabel} profile`}
            />
            <div>
              <p>{valueOrFallback(user?.fullname)}</p>
              <span>
                <FiUser />
                {partyLabel} {t("contractDetail.party.desc")}
              </span>
            </div>
          </div>
        </div>

        <NavLink to={`/dashboard/${role}/messages`} className={styles.openConv}>
          <FiMessageCircle />
          <span>Message {partyLabel}</span>
        </NavLink>
      </div>

      <div className={styles.contractStaffRight}>
        <div className={styles.contractStaffRightItem}>
          <div className={styles.itemIcon}>
            <FiCalendar />
          </div>
          <div>
            <h5>{t("common.labels.created")}</h5>
            <p>{headerInfo.created_at}</p>
          </div>
        </div>

        <div className={styles.contractStaffRightItem}>
          <div className={styles.itemIcon}>
            <FiClock />
          </div>
          <div>
            <h5>{t("common.labels.finalDeadline")}</h5>
            <p>{headerInfo.final_deadline}</p>
          </div>
        </div>

        {headerInfo.status === "active" && (
          <div className={styles.contractStaffRightItem}>
            <div className={styles.itemIcon}>
              <FiClock />
            </div>
            <div>
              <h5>{t("common.labels.currentDeliverableDeadline")}</h5>
              <p>{headerInfo.cur_deliverable_deadline}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractParty;
