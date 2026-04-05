import styles from './AdminSideBar.module.css'
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { MdCategory } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
function AdminSideBar() {
    return ( 
        <div className={styles.container}>
     
      <div className={styles.sidebar}>
        <h2 className={styles.title}>Admin Dashboard</h2>

        <ul className={styles.menu}>
          <li className={styles.active}>
            <LuLayoutDashboard />Dashboard
          </li>
          <li>
           <FiUsers /> Users
          </li>
          <li>
           <GrProjects /> Projects
          </li>
          <li>
            <MdCategory /> Categories
          </li>
          <li>
            <GiSkills /> Skills
          </li>
        </ul>

        <button className={styles.logout}>Logout (→</button>
      </div>
      </div>
    );
}

export default AdminSideBar;