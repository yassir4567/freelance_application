import styles from "../styles/ContractParty.module.css";
import profile from "../../../assets/images/profile.png";

function ContractParty({ role, user, headerInfo }) {
  return (
    <div className={styles.contractStaff}>
      <div className={styles.userMinCard}>
        <div className={styles.userMinCardBox}>
          <h5>{role === "client" ? "Freelancer" : "Client"}</h5>
          <div className={styles.userMinCardContent}>
            <img src={profile} className={styles.userAvatar} alt="user img" />
            <p>{user?.fullname}</p>
          </div>
        </div>
        <button className={styles.openConv}>
          Message {role === "client" ? "Freelancer" : "Client"}
        </button>
      </div>
      <div className={styles.contractStaffRight}>
        <div className={styles.contractStaffRightItem}>
          <h5>Created at</h5>
          <p>{headerInfo.created_at}</p>
        </div>

        {headerInfo.status === "active" && (
          <div className={styles.contractStaffRightItem}>
            <h5>Current deliverable deadline</h5>
            <p>{headerInfo.cur_deliverable_deadline}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractParty;
