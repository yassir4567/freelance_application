import styles from "./UserHeader.module.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import profile from "../../assets/images/profile.png";
import { useEffect, useRef, useState } from "react";
import ProfileMenu from "../common/ProfileMenu";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SlWallet } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoRemoveOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";

function UserHeader({ links }) {
  const { i18n } = useTranslation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const ref = useRef(null);
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { t } = useTranslation();

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

  const handleLogout = async (e) => {
    await logout();
  };

  const handleChangeLang = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const lang = localStorage.getItem("lang") || "fr";

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
        <div className={styles.langBox}>
          <select
            className={styles.langSelect}
            defaultValue={lang}
            onChange={handleChangeLang}
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>
        </div>

        <div
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className={styles.profile_icon}
        >
          <p className={styles.fullName}>{fullName}</p>
          <img src={profile} className={styles.profile} alt="profile icon" />
        </div>

        <div className={styles.menu} onClick={() => setShowMobileMenu(true)}>
          <HiMenuAlt3 />
        </div>
      </div>

      {showMobileMenu && (
        <div className={styles.mobileMenuWrapper} onClick={closeMobileMenu}>
          <div
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.closeMenu} onClick={closeMobileMenu}>
              <IoRemoveOutline />
            </div>
            <nav className={styles.mobileMenu_navbar}>
              <ul className={styles.mobileMenu_navbar_list}>
                {links.map((link) => (
                  <li
                    key={link.label}
                    className={styles.mobileMenu_navbar_item}
                  >
                    <NavLink
                      to={link.to}
                      end
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.mobileMenu_active_link} ${styles.mobileMenu_link}`
                          : `${styles.mobileMenu_link}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
                <hr />
                <li className={styles.mobileMenu_navbar_item}>
                  <NavLink
                    to="/dashboard/freelancer/profile"
                    end
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.mobileMenu_active_link} ${styles.mobileMenu_link}`
                        : `${styles.mobileMenu_link}`
                    }
                  >
                    {t("ui.labels.freelancerProfile")}
                  </NavLink>
                </li>
                <li className={styles.mobileMenu_navbar_item}>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    <RiLogoutCircleRLine color="red" />
                    <span>{t("ui.actions.logout")}</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      {showProfileMenu && !showMobileMenu && (
        <div className={styles.profile_dropdown}>
          <ProfileMenu user={user} onClose={onClose} logout={handleLogout} />
        </div>
      )}
    </header>
  );
}

export default UserHeader;
