import { NavLink } from "react-router-dom";
import styles from "../styles/FreelancerActiveContracts.module.css";
import { formatDate } from "../../../utils/helpers";

function FreelancerActiveContracts({ contracts }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headerRow}>
          <th>Project</th>
          <th>Client</th>
          <th>Budget</th>
          <th>Deadline</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contracts.map((contract) => (
          <tr key={contract.id} className={styles.row}>
            <td>{contract.title}</td>
            <td>
              <div className={styles.clientTD}>
                <img src={contract.client.avatar} width={37} alt="Avatar" />
              <span>{contract.client.fullName}</span>
              </div>
            </td>
            <td className={styles.budget}> $ {contract.budget} </td>
            <td className={styles.deadline}> {formatDate(contract.deadline)} </td>
            <td>
              <NavLink className={styles.link}>View details</NavLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FreelancerActiveContracts;
