import PublicFooter from "../../components/PublicFooter"
import { PublicHeader } from "../../components/Header"

const PrivacyPolicy = () => {
  return (
    <div className={styles["landing_container"]}>
      <PublicHeader />
      <div className={styles["landing_margin"]}>
        <div className={styles["landing_sub-wrapper"]}>
          <h2>Privacy Policy</h2>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>1. Introduction</h2>
            <div className={styles["landing_paragraph"]}>
              Welcome to Hubly Chat Bot Support System ("Platform"). This
              Privacy Policy explains how we collect, use, and protect your
              personal data when you interact with our AI-powered chat and
              support tools.
            </div>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>
              2. Information We Collect
            </h2>
            <ul className={styles["unordered-list"]}>
              <li>
                Name, email address, and contact details shared when initiating
                support conversations or registering.
              </li>
              <li>
                Chat transcripts, user queries, feedback, and usage history
                within the support interface.
              </li>
              <li>
                Technical details like IP address, browser version, device info,
                and location (via cookies or analytics).
              </li>
            </ul>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>
              3. How We Use Your Information
            </h2>
            <ul className={styles["unordered-list"]}>
              <li>
                To deliver and enhance automated support experiences via our
                chat system.
              </li>
              <li>
                To improve chatbot intelligence and personalize support
                responses.
              </li>
              <li>
                To follow up on user issues and provide human-agent escalations
                if needed.
              </li>
              <li>To analyze usage trends and ensure platform security.</li>
            </ul>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>
              4. Data Sharing & Third Parties
            </h2>
            <ul className={styles["unordered-list"]}>
              <li>We do not sell your data to third parties.</li>
              <li>
                We may share data with AI model training services or support
                vendors for service enhancement.
              </li>
              <li>
                Payment or identity verification services may access limited
                data when integrated.
              </li>
            </ul>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>
              5. Data Protection & Security
            </h2>
            <ul className={styles["unordered-list"]}>
              <li>
                All data is encrypted in transit and at rest using
                industry-standard security protocols.
              </li>
              <li>
                Access to user data is restricted to authorized personnel only.
              </li>
            </ul>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>
              6. Cookies & Tracking Technologies
            </h2>
            <p className={styles["landing_paragraph"]}>
              Cookies help us track user interactions within the chatbot,
              improving response accuracy and speed. You can manage cookie
              settings through your browser preferences.
            </p>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>
              7. User Rights & Choices
            </h2>
            <ul className={styles["unordered-list"]}>
              <li>
                You may request to view, update, or delete your chat history and
                personal data.
              </li>
              <li>
                You can disable chatbot tracking by adjusting your cookie
                settings.
              </li>
              <li>
                Requests for data-related actions can be sent to our support
                team.
              </li>
            </ul>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>8. Data Retention</h2>
            <p className={styles["landing_paragraph"]}>
              We retain data only for as long as required for operational,
              legal, or training purposes. User data from chatbot conversations
              may be anonymized for AI model improvements.
            </p>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>
              9. Changes to Privacy Policy
            </h2>
            <p className={styles["landing_paragraph"]}>
              We may periodically update this policy to reflect changes in data
              practices. Major updates will be communicated on the Hubly
              platform.
            </p>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>
              10. Contact Information
            </h2>
            <div className={styles["landing_paragraph"]}>
              For privacy-related inquiries, please reach out to our team at
              privacy@hubly.ai.
            </div>
          </section>
        </div>
      </div>

      <PublicFooter />
    </div>
  )
}

export default PrivacyPolicy