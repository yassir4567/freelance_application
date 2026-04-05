import styles from './ContractParty.module.css'
import profile from '../../assets/images/profile.png'

function ContractParty({user}) {
  return (
    <div className={styles.contractStaff}>
      {user === "client" ? (
        <div className={styles.userMinCard}>
          <div className={styles.userMinCardBox}>
            <h5>Freelancer</h5>
            <div className={styles.userMinCardContent}>
              <img src={profile} className={styles.userAvatar} alt="user img" />
              <p>Freelancer Name</p>
            </div>
          </div>
          <button className={styles.openConv}>Message freelancer</button>
        </div>
      ) : (
        <div className={styles.userMinCard}>
          <div className={styles.userMinCardBox}>
            <h5>Client</h5>
            <div className={styles.userMinCardContent}>
              <img src={profile} className={styles.userAvatar} alt="user img" />
              <p>Client Name</p>
            </div>
          </div>
          <button className={styles.openConv}>Message client</button>
        </div>
      )}
      <div className={styles.contractStaffRight}>
        <div className={styles.contractStaffRightItem}>
          <h5>Created at</h5>
          <p>Jan 14, 2026</p>
        </div>

        <div className={styles.contractStaffRightItem}>
          <h5>Current deliverable deadline</h5>
          <p>Feb 14, 2026</p>
        </div>
      </div>
    </div>
  );
}

export default ContractParty;
