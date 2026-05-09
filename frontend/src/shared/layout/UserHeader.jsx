import styles from "./UserHeader.module.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import profile from "../../assets/images/profile.png";
import { useEffect, useRef, useState } from "react";
import ProfileMenu from "../common/ProfileMenu";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SlWallet } from "react-icons/sl";

function UserHeader({ links }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const ref = useRef(null);
  const { user } = useAuth();

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

  const fullName = user.first_name + " " + user.last_name;

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
        <div className={styles.wallet}>
          <span>$ 199</span>
          <SlWallet className={styles.walletIcon} />
        </div>
        <div
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className={styles.profile_icon}
        >
          <p className={styles.fullName}>{fullName}</p>
          <img src={profile} className={styles.profile} alt="profile icon" />
        </div>
      </div>
      {showProfileMenu && (
        <div className={styles.profile_dropdown}>
          <ProfileMenu user={user} onClose={onClose} />
        </div>
      )}
    </header>
  );
}

export default UserHeader;
