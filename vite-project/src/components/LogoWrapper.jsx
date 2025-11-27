import { Link } from "react-router-dom";
import LOGO from "../assets/logo.png";
import styles from "../Styles/logoWrapper.module.css";

const LogoWrapper = ({ hasTitle = true }) => {
  return (
    <Link to="/" className={styles.logolink}>
      <div className={styles.logowrapper}>
        <img src={LOGO} alt="HUBLY" width={45} />
        {hasTitle && <span>Hubly</span>}
      </div>
    </Link>
  );
};

export default LogoWrapper;

