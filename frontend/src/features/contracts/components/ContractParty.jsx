import styles from "../styles/ContractParty.module.css";
import profile from "../../../assets/images/profile.png";
import { NavLink } from "react-router-dom";
import { FiCalendar, FiClock, FiMessageCircle, FiUser } from "react-icons/fi";
import { valueOrFallback } from "../utils/contractDisplay";

function ContractParty({ role, user, headerInfo }) {
  const partyLabel = role === "client" ? "Freelancer" : "Client";

  return (
    <div className={styles.contractStaff}>
      <div className={styles.userMinCard}>
        <p className={styles.sidebarKicker}>People</p>
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
                {partyLabel} on this contract
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
            <h5>Created</h5>
            <p>{headerInfo.created_at}</p>
          </div>
        </div>

        <div className={styles.contractStaffRightItem}>
          <div className={styles.itemIcon}>
            <FiClock />
          </div>
          <div>
            <h5>Final deadline</h5>
            <p>{headerInfo.final_deadline}</p>
          </div>
        </div>

        {headerInfo.status === "active" && (
          <div className={styles.contractStaffRightItem}>
            <div className={styles.itemIcon}>
              <FiClock />
            </div>
            <div>
              <h5>Current milestone deadline</h5>
              <p>{headerInfo.cur_deliverable_deadline}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractParty;
