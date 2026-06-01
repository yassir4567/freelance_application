import styles from "./AdminSideBar.module.css";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

function AdminSideBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const links = [
    {
      label: t("ui.labels.dashboard"),
      path: "/dashboard/admin",
      icon: <LuLayoutDashboard />,
      end: true,
    },
    {
      label: t("admin.users.title"),
      path: "/dashboard/admin/users",
      icon: <FiUsers />,
      end: false,
    },
    {
      label: t("admin.categories.title"),
      path: "/dashboard/admin/categories",
      icon: <MdCategory />,
      end: true,
    },
    {
      label: t("admin.skills.title"),
      path: "/dashboard/admin/skills",
      icon: <GiSkills />,
      end: true,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.brand}>
          <div>
            <h2>Admin</h2>
            <p>{t("ui.labels.dashboard")}</p>
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
        <span>{t("ui.actions.logout")}</span>
      </button>
    </div>
  );
}

export default AdminSideBar;
