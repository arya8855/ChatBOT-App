import { Link } from "react-router-dom"
import DISCORD_ICON from "../assets/logo/discord.svg"
import FIGMA_ICON from "../assets/logo/figma.svg"
import INSTAGRAM_ICON from "../assets/logo/instagram.svg"
import LINKEDIN_ICON from "../assets/logo/linkedin.svg"
import EMAIL_ICON from "../assets/logo/mail.svg"
import TWITTER_ICON from "../assets/logo/twitter.svg"
import YOUTUBE_ICON from "../assets/logo/youtube.svg"

import styles from '../Styles/publicFooter.module.css';
import LogoWrapper from "./LogoWrapper";

const PublicFooter = () => {
  return (
    <div className={styles["landing_footer-container"]}>
      <div className={styles["footer-wrapper landing_margin"]}>
        <div className={styles["footer-btn-wrapper"]}>
          <LogoWrapper />
        </div>

        <div className={styles["footer-sub-wrapper"]}>
          <div className={styles["footer-item-wrapper"]}>
            <div>Product</div>
            <Link to="../universal-checkout">Universal checkout</Link>
            <Link to="../payment-workflows">Payment workflows</Link>
            <Link to="../observability">Observability</Link>
            <Link to="../upliftai">UpliftAI</Link>
            <Link to="../integrations">Apps & integrations</Link>
          </div>

          <div className={styles["footer-item-wrapper"]}>
            <div>Why Primer</div>
            <Link to="../expand-to-new-markets">Expand to new markets</Link>
            <Link to="../boost-payment-success">Boost payment success</Link>
            <Link to="../improve-conversion-rates">Improve conversion rates</Link>
            <Link to="../reduce-payments-fraud">Reduce payments fraud</Link>
            <Link to="../recover-revenue">Recover revenue</Link>
          </div>

          <div className={styles["footer-item-wrapper"]}>
            <div>Developers</div>
            <Link to="../primer-docs">Primer Docs</Link>
            <Link to="../api-references">API Reference</Link>
            <Link to="../payment-methods-guide">Payment methods guide</Link>
            <Link to="../service-status">Service status</Link>
            <Link to="../community">Community</Link>
          </div>

          <div className={styles["footer-item-wrapper"]}>
            <div>Resources</div>
            <Link to="../blog">Blog</Link>
            <Link to="../success-stories">Success stories</Link>
            <Link to="../news-room">News room</Link>
            <Link to="../terms-and-conditions">Terms</Link>
            <Link to="../privacy-policy">Privacy</Link>
          </div>

          <div className={styles["footer-item-wrapper"]}>
            <div>Company</div>
            <Link to="../about-hubly">Careers</Link>
          </div>

          <div className={styles["footer-item-wrapper"]}>
            <div className={styles["footer-icons"]}>
              {[
                EMAIL_ICON,
                LINKEDIN_ICON,
                TWITTER_ICON,
                YOUTUBE_ICON,
                DISCORD_ICON,
                FIGMA_ICON,
                INSTAGRAM_ICON,
              ].map((ICON, i) => (
                <img
                  key={i}
                  src={ICON}
                  width={25}
                  height={25}
                  alt="social-icon"
                  className={styles.social_icon}
                />
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicFooter
