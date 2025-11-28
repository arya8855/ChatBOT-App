import { Link } from "react-router-dom";
import FRAME from "../assets/Frame.png";
import "./css/authWrapper.css";
import LogoWrapper from "./LogoWrapper";

const AuthWrapper = ({
  title,
  children,
  sideLink,
  sideText,
  hasbottomLine = true,
  className = ""
}) => {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <LogoWrapper />

        <div className="form-wrapper hidden-scrollbar">
          <div className="auth-title">
            <div className="m-0 h3">{title}</div>

            {sideLink && (
              <Link
                to={`../auth/${sideLink}`}
                className="text-secondary text-xs"
              >
                {sideText}
              </Link>
            )}
          </div>

          <div>{children}</div>
        </div>

        {hasbottomLine && (
          <div className="text-secondary text-center text-xs mb-3">
            This site is protected by reCAPTCHA and the{" "}
            <Link className="text-secondary" to={"../"}>
              Google Privacy Policy
            </Link>{" "}
            and
            <Link className="text-secondary">
              Terms of Service
            </Link>{" "}
            apply.
          </div>
        )}
      </div>

      <div className="auth-image right">
        <img alt="auth-wrapper" src={FRAME} />
      </div>
    </div>
  );
};

export default AuthWrapper;