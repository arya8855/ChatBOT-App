import LinkButton from "./LinkBtn";
import Button from "./Button";
import LogoWrapper from "./LogoWrapper";
import styles from "../Styles/header.module.css";


const Header = ({ description, title, button }) => {
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles["header-content"]}>
        <h3>{title}</h3>
        {description && <div className="text-secondary">{description}</div>}
      </div>

      {button && (
        <span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={styles["min-w-max-content"]}
            onClick={button.handleClick}
          >
            {button.title}
          </Button>
        </span>
      )}
    </div>
  )
}

export default Header

export const PublicHeader = () => {
  return (
    <div className={`${styles["landing_header-wrapper"]} ${styles["landing_margin"]}`}>
      <div className={styles["landing_header-content"]}>
        <LogoWrapper />
        <div className={styles["landing_header-buttons"]}>
          <LinkButton text="Login" redirectTo="/auth/sign-in" isLight />
          <span className={styles["landing_header-signup-btn"]}>
            <LinkButton />
          </span>
        </div>
      </div>
    </div>
  )
}