import styles from "./UserHeader.module.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import profile from "../../assets/images/profile.png";
import { useEffect, useRef, useState } from "react";
import ProfileMenu from "../common/ProfileMenu";
import { NavLink } from "react-router-dom";

function UserHeader({ links }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const ref = useRef(null);

  const onClose = () => {
    setShowProfileMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header} ref={ref}>
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
          <img src={profile} className={styles.profile} alt="profile icon" />
        </div>
      </div>
      {showProfileMenu && (
        <div className={styles.profile_dropdown}>
          <ProfileMenu />
        </div>
      )}
    </header>
  );
}

export default UserHeader;
