import styles from "./UserHeader.module.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import profile from "../../assets/images/profile.png";
import { useState } from "react";
import ProfileMenu from "../common/ProfileMenu";
import { NavLink } from "react-router-dom";

function UserHeader({ links }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Freelancy</div>
      <nav className={styles.navbar}>
        <ul className={styles.navbar_list}>
          {links.map((link) => (
            <li key={link.label} className={styles.navbar_item}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active_link} ${styles.link}`
                    : `${styles.link}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.header_right}>
        <span className={styles.notification_icon}>
          <IoMdNotificationsOutline />
        </span>
        <div
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className={styles.profile_icon}
        >
          <img src={profile} alt="profile icon" />
        </div>
      </div>
      <div
        className={`${styles.profile_dropdown} ${showProfileMenu && styles.show}`}
      >
        <ProfileMenu />
      </div>
    </header>
  );
}

export default UserHeader;
