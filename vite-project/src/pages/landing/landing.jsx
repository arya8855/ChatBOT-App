import { Link } from "react-router-dom"
import ARROW_IMAGE from "../../assets/arrow.png"
import BACKGOURND_1 from "../../assets/bg-1.svg"
import BUCKET_IMAGE from "../../assets/bucket.svg"
import CHECK_ICON from "../../assets/check.svg"
import HERO_NOTIFICATION_IMAGE from "../../assets/hero-notification.svg"
import HERO_SALES_IMAGE from "../../assets/hero-sales.svg"
import ADOBE_ICON from "../../assets/logo/adobe.svg"
import OPENDOOR_ICON from "../../assets/logo/opendoor.svg"
import FRAMER_ICON from "../../assets/logo/framer.svg"
import AIRTABLE_ICON from "../../assets/logo/airtable.svg"
import ELASTIC_ICON from "../../assets/logo/elastic.svg"
import VIDEO_ICON from "../../assets/play.svg"
import SOCIAL_GROUP_IMAGE from "../../assets/socials.svg"
import Button from "../../components/Button"
import ChatBot from "../../components/ChatBot"
import "../../components/css/landing.css"
import PublicFooter from "../../components/PublicFooter"
import { PublicHeader } from "../../components/Header"
import LinkButton from "../../components/LinkBtn"

const LandingPage = () => {
  return (
    <div className="landing_container">
      <PublicHeader />

      <div className="landing_margin">
        {/* Hero Section */}
        <div className="landing_hero-container">
          <div className="landing_hero-section">
            <h2 className="landing_hero-title">
              Grow Your Business Faster with Hubly CRM
            </h2>

            <div className="landing_hero-paragraph">
              Manage leads, automate workflows, and close deals effortlessly—
              all in one powerful platform.
            </div>

            <div>
              <Link to="/auth/sign-up" className="no_decoration">
                <Button color="primary" icon={ARROW_IMAGE} iconPosition="right">
                  Get started
                </Button>
              </Link>

              <span className="landing_hero-video">
                <img src={VIDEO_ICON} alt="video" width={12} height={12} />
                Watch Video
              </span>
            </div>
          </div>

          <div className="landing_hero-image-wrapper">
            <img src={HERO_NOTIFICATION_IMAGE} alt="hero-notification-image" />
            <img src={HERO_SALES_IMAGE} alt="hero-sales-image" />
            <img src={BACKGOURND_1} alt="hero-bg-image" />
          </div>
        </div>
      </div>

      {/* Logo Icons */}
      <div className="landing_icons-wrapper">
        <div className={`${"landing_icons-container"} ${"landing_margin"}`}>
          {[ADOBE_ICON, ELASTIC_ICON, OPENDOOR_ICON, AIRTABLE_ICON, FRAMER_ICON].map(
            (ICON, i) => (
              <img src={ICON} key={i} className="landing_icons" alt="logo" />
            )
          )}
        </div>
      </div>

      <div className="landing_margin">
        {/* CRM Section */}
        <div className="landing_crm-section">
          <div className="landing_hero-descrion">
            <h3 className="landing_heading">
              At its core, Hubly is a robust CRM solution.
            </h3>

            <div className="landing_paragraph">
              Hubly helps businesses streamline customer interactions, track
              leads, and automate tasks—saving you time and maximizing revenue.
            </div>
          </div>

          <div className="crm-section">
            <div className="crm-text-group">
              <div>
                <h4>MULTIPLE PLATFORMS TOGETHER!</h4>
                <div>Email communication is a breeze...</div>
              </div>

              <div>
                <h4>NURTURE</h4>
                <div>Capture leads using our landing pages...</div>
              </div>

              <div>
                <h4>CLOSE</h4>
                <div>Capture leads using our landing pages...</div>
              </div>
            </div>

            <div className="crm-graphic">
              <img src={BUCKET_IMAGE} alt="Funnel" className="funnel" />

              <div className="crm-icons">
                <img src={BACKGOURND_1} alt="icon" className="crm-bg" />
                <img src={SOCIAL_GROUP_IMAGE} alt="icon" className="crm-social"/>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="landing_pricing-section">
          <div className="landing_hero-descrion">
            <h3 className="landing_heading">We have plans for everyone!</h3>

            <div className="landing_paragraph">
              We started with a strong foundation, then built all the tools
              businesses need under one platform.
            </div>
          </div>

          <div className="pricing-container">
            {PRICING_CARD.map((item) => (
              <div className="pricing-card" key={item.plan}>
                <h3>{item.plan}</h3>
                <div className="description">{item.description}</div>
                <div className="price">{item.price}</div>

                <div className="features-title">What's included</div>

                <div className="feature-list">
                  {item.features.map((feature, idx) => (
                    <div className="feature" key={idx}>
                      <img src={CHECK_ICON} alt="check" className="check-icon" />
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pricing-button">
                  <LinkButton
                    text={item.buttonText}
                    isLight
                    redirectTo="../auth/sign-up"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ChatBot />
      <PublicFooter />
    </div>
  )
}

export default LandingPage

const PRICING_CARD = [
  {
    plan: "STARTER",
    description: "Best for local businesses needing to improve their online reputation.",
    price: "$199",
    features: [
      "Unlimited Users",
      "GMB Messaging",
      "Reputation Management",
      "GMB Call Tracking",
      "24/7 Award Winning Support",
    ],
    buttonText: "SIGN UP FOR STARTER",
  },
  {
    plan: "GROW",
    description:
      "Best for all businesses that want to take full control of their marketing automation and track their leads.",
    price: "$399",
    features: [
      "Pipeline Management",
      "Marketing Automation Campaigns",
      "Live Call Transfer",
      "GMB Messaging",
      "Embed-able Form Builder",
      "Reputation Management",
      "24/7 Award Winning Support",
    ],
    buttonText: "SIGN UP FOR STARTER",
  },
]