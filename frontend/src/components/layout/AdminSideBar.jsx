import styles from "./AdminSideBar.module.css";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { MdCategory } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function AdminSideBar() {
  return (
    <div className={styles.sidebar}>
      <div>
        <h2 className={styles.title}>Admin Dashboard</h2>

        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <NavLink
              to="/dashboard/admin"
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuLink} ${styles.activeLink} `
                  : `${styles.menuLink}`
              }
            >
              <LuLayoutDashboard />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/users"
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuLink} ${styles.activeLink} `
                  : `${styles.menuLink}`
              }
            >
              <FiUsers /> Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/projects"
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuLink} ${styles.activeLink} `
                  : `${styles.menuLink}`
              }
            >
              <GrProjects /> Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/categories"
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuLink} ${styles.activeLink} `
                  : `${styles.menuLink}`
              }
            >
              <MdCategory /> Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/skills"
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuLink} ${styles.activeLink} `
                  : `${styles.menuLink}`
              }
            >
              <GiSkills /> Skills
            </NavLink>
          </li>
        </ul>
      </div>

      <button className={styles.logout}>
        Logout <IoLogOutOutline />
      </button>
    </div>
  );
}

export default AdminSideBar;
