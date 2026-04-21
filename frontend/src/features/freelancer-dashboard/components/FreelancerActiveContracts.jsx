import { NavLink } from "react-router-dom";
import styles from "../styles/FreelancerActiveContracts.module.css";
import { formatDate } from "../../../utils/helpers";
import avatar from "../../../assets/images/profile.png";

function FreelancerActiveContracts({ contracts }) {
  const hasContracts = contracts?.length > 0;

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
        {hasContracts ? (
          contracts?.map((contract) => {
            const {
              id,
              final_price,
              final_deadline,
              proposal: {
                project: {
                  title,
                  client: { first_name, last_name },
                },
              },
            } = contract;

            return (
              <tr key={id} className={styles.row}>
                <td>{title}</td>
                <td>
                  <div className={styles.clientTD}>
                    <img src={avatar} width={37} alt="Avatar" />
                    <span>
                      {first_name} {last_name}
                    </span>
                  </div>
                </td>
                <td className={styles.budget}> ${final_price} </td>
                <td className={styles.deadline}>
                  {" "}
                  {formatDate(final_deadline)}
                </td>
                <td>
                  <NavLink className={styles.link}>View details</NavLink>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colspan="5" className={styles.empty}>
              You don't have active contracts yet
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default FreelancerActiveContracts;
