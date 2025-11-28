import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import CHAT_BOT_SVG from "../assets/chatbot.svg";
import HOME_SVG from "../assets/home.svg";
import MESSAGE_SVG from "../assets/message.svg";
import PROFILE_SVG from "../assets/profile.svg";
import ANALYTICS_SVG from "../assets/ranking.svg";
import SETTINGS_SVG from "../assets/settings.svg";
import TEAM_SVG from "../assets/team.svg";

import { logoutUser } from "../redux/slice/user-slice";
import LogoWrapper from "./LogoWrapper";

import styles from "../Styles/sidebar.module.css"; 

// Sidebar Menu List
const ASIDE_LIST = [
  { id: 1, title: "Dashboard", navigationURL: "dashboard", icon: HOME_SVG },
  { id: 2, title: "Contact", navigationURL: "chat", icon: MESSAGE_SVG },
  { id: 3, title: "Analytics", navigationURL: "analytics", icon: ANALYTICS_SVG },
  { id: 4, title: "Chat Bot", navigationURL: "chat-bot-settings", icon: CHAT_BOT_SVG },
  { id: 5, title: "Team", navigationURL: "teams", icon: TEAM_SVG },
  { id: 6, title: "Setting", navigationURL: "settings", icon: SETTINGS_SVG }
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle screen width change
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    setIsMobile(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Logout handler
  const handleDelete = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  // MOBILE VERSION
  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <div className={styles.mobileHeader}>
          <LogoWrapper hasTitle={false} />

          <div className={styles.userWrapper}>
            <div className={styles.mobileUser}>
              <img src={PROFILE_SVG} alt="User" width={25} />
            </div>

            <div className={styles.userPopupContent} onClick={handleDelete}>
              Signout
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className={styles.mobileBottomNav}>
          {ASIDE_LIST.map((item) => (
            <NavLink
              key={item.id}
              to={`./${item.navigationURL}`}
              className={({ isActive }) =>
                clsx(styles.mobileNavLink, { [styles.activeLink]: isActive })
              }
              end
            >
              {({ isActive }) => (
                <>
                  <img src={item.icon} alt={item.title} width={25} className={styles.navIcon} />
                  {isActive && <div className={styles.navTitle}>{item.title}</div>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </>
    );
  }

  // DESKTOP VERSION
  return (
    <>
      <div>
        <div className={styles.Header}>
          <LogoWrapper hasTitle={false} />
        </div>
        

        {/* Navigation */}
        <nav className={styles.navigationWrapper}>
          {ASIDE_LIST.map((item) => (
            <NavLink
              key={item.id}
              to={`./${item.navigationURL}`}
              className={({ isActive }) =>
                clsx(styles.navLink, { [styles.activeLink]: isActive })
              }
              end
            >
              {({ isActive }) => (
                <>
                  <img src={item.icon} alt={item.title} width={25} className={styles.navIcon} />
                  {isActive && <div className={styles.navTitle}>{item.title}</div>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className={styles.asideFooter}>
        <div className={styles.userPopupTrigger}>
          <img src={PROFILE_SVG} alt="user" width={25} />
        </div>

        <div className={styles.userPopupContent} onClick={handleDelete}>
          Sign Out
        </div>
      </div>
    </>
  );
};

export default Sidebar;
