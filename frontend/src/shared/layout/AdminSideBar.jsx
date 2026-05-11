import styles from "./AdminSideBar.module.css";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  {
    label: "Dashboard",
    path: "/dashboard/admin",
    icon: <LuLayoutDashboard />,
    end: true,
  },
  {
    label: "Users",
    path: "/dashboard/admin/users",
    icon: <FiUsers />,
    end: false,
  },
  {
    label: "Categories",
    path: "/dashboard/admin/categories",
    icon: <MdCategory />,
    end: true,
  },
  {
    label: "Skills",
    path: "/dashboard/admin/skills",
    icon: <GiSkills />,
    end: true,
  },
];

function AdminSideBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.brand}>
          <span>FA</span>
          <div>
            <h2>Admin</h2>
            <p>Dashboard</p>
          </div>
        </div>

        <ul className={styles.menu}>
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menuLink} ${styles.activeLink}`
                    : styles.menuLink
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className={styles.logout} onClick={handleLogout}>
        <IoLogOutOutline />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default AdminSideBar;
