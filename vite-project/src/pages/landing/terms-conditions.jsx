import PublicFooter from "../../components/PublicFooter";
import { PublicHeader } from "../../components/Header";

const TermsAndConditions = () => {
  return (
    <div className={styles["landing_container"]}>
      <PublicHeader />
      <div className={styles["landing_margin"]}>
        <div className={styles["landing_sub-wrapper"]}>
          <h2>Terms & Conditions</h2>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>1. Introduction</h2>
            <div className={styles["landing_paragraph"]}>
              Welcome to Hubly Chat Bot Support System ("Platform"). These Terms
              & Conditions govern your use of our AI-driven customer support
              services. By accessing or using our platform, you agree to comply
              with these terms.
            </div>
          </section>

           <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>2. Definitions</h2>
            <ul className={styles["unordered-list"]}>
              <li>"Platform" refers to the Hubly Chat Bot Support System provided by Hubly.</li>
              <li>"User" means any individual or entity interacting with our support system.</li>
              <li>"Support Agent" includes automated bots or human representatives providing assistance.</li>
              <li>"Conversation Data" refers to messages, queries, and interactions shared on the platform.</li>
            </ul>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>3. User Accounts & Access</h2>
            <ul className={styles["unordered-list"]}>
              <li>Users may be required to authenticate or provide contact details to access support features.</li>
              <li>All provided information must be accurate and up to date.</li>
              <li>We reserve the right to suspend access for suspicious or malicious activity.</li>
            </ul>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>4. Use of Chatbot & Support Services</h2>
            <ul className={styles["unordered-list"]}>
              <li>Users must use the support tools only for legitimate queries or assistance.</li>
              <li>Misuse of the bot or flooding the system with spam may result in access restrictions.</li>
              <li>Hubly is not liable for any decision made solely based on bot responses.</li>
            </ul>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>5. Service Availability</h2>
            <ul className={styles["unordered-list"]}>
              <li>We aim to provide uninterrupted service, but downtime may occur due to maintenance or updates.</li>
              <li>Service availability is not guaranteed and may vary across regions.</li>
            </ul>
          </section>

           <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>6. Code of Conduct</h2>
            <ul className={styles["unordered-list"]}>
              <li>Abusive language, threats, or inappropriate content shared via the chatbot is strictly prohibited.</li>
              <li>We reserve the right to block or report users violating ethical use policies.</li>
            </ul>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>7. Intellectual Property</h2>
            <div className={styles["landing_paragraph"]}>
              All content, workflows, and AI responses are the intellectual property of Hubly. Reuse or
              redistribution without consent is prohibited.
            </div>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>8. Limitation of Liability</h2>
            <p className={styles["landing_paragraph"]}>
              Hubly is not responsible for any damages or losses arising from chatbot errors, delays in
              human support, or reliance on automated replies. Use the platform at your own discretion.
            </p>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>9. Privacy Policy</h2>
            <p className={styles["landing_paragraph"]}>
              Our Privacy Policy outlines how your data is collected and used during chat interactions.
              Continued use indicates consent to our data practices.
            </p>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>10. Termination & Suspension</h2>
            <ul className={styles["unordered-list"]}>
              <li>Hubly may suspend or terminate access if these terms are violated.</li>
              <li>Users may request account or data deletion at any time.</li>
            </ul>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>11. Changes to Terms</h2>
            <p className={styles["landing_paragraph"]}>
              We may update these Terms & Conditions occasionally. Significant changes will be
              communicated via the platform.
            </p>
          </section>

          <section className={styles["terms-section"]}>
            <h2 className={styles["landing_sub-heading"]}>12. Contact Information</h2>
            <div className={styles["landing_paragraph"]}>
              For questions or legal concerns, contact us at support@hubly.ai.
            </div>
          </section>
        </div>
      </div>

        <PublicFooter />
    </div>
  )
}

export default TermsAndConditions