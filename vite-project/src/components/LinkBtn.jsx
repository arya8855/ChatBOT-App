import { Link } from "react-router-dom"
import Button from "./Button"
import styles from "../Styles/linkBtn.module.css";

const LinkButton = ({
  redirectTo = "../auth/sign-up",
  text = "Sign up free",
  color = "primary",
  className = "",
  isLight = false,
}) => {
  return (
    <Link to={redirectTo} className={styles["link-button"]}>
      <Button
        type="button"
        color={color}
        className={className}
        variant={isLight ? "outline" : "default"}
      >
        {text}
      </Button>
    </Link>
  )
}

export default LinkButton