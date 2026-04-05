import styles from "./DashboardCards.module.css"

function AdminCards(){
    return(
          <div className={styles.cards}>
          <div className={styles.card}>
           
            <p>Total Freelancers</p>
            <h2>99</h2>
          </div>

          <div className={styles.card}>
          
            <p>Total Clients</p>
            <h2>99</h2>
          </div>

          <div className={styles.card}>
           
            <p>Total Projects</p>
            <h2>99</h2>
          </div>

          <div className={styles.card}>
          
            <p>Completed Projects</p>
            <h2>99</h2>
          </div>
        </div>
      
    )
};
export default AdminCards;