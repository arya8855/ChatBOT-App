import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import styles from "../../Styles/layout.module.css";

const DashboardLayout = () => {
  const location = useLocation()
  const isChatRoute = /^\/app\/chat(\/\w+)?$/.test(location.pathname);

  return (
    <div className={styles["layout-wrapper"]}>
      <aside className={styles["aside-wrapper"]}>
        <Sidebar />
      </aside>

       <main
        className={`${styles["main-wrapper"]} ${styles["hidden-scrollbar"]} ${
          isChatRoute ? styles["padding-0"] : ""
        }`}
      >
        <Outlet />
        <div className={styles["private-footer"]} />
      </main>
    </div>
  )
}

export default DashboardLayout