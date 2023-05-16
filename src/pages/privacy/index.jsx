import { FormattedMessage } from "react-intl";
import styles from "./privacy.module.css";

export default function Privacy() {
  return (
    <div className={styles.privacy_container}>
      <img src="/assets/Logo.png" alt="Logo" className={styles.logo} />
      <p className={styles.title}>
        <FormattedMessage id="home.privacy" />
      </p>

      <ul className={styles.privacy_content}>
        <li>
          Our App takes your confidentiality seriously and we are keen on
          acquiring your confidence.
        </li>
        <li>
          SpotX is committed to maintaining the confidentiality of your private
          data and will not make it available to any third party without your
          knowledge unless it is required to provide the content or the services
          you have requested, or with your permission, or under any of the
          following circumstances:
          <ul className="mt-2">
            <li>
              Providing information to trusted partners who work with or on
              behalf of SpotX. These companies may use your personal information
              to help Us provide you with services or to help us communicate
              with you regarding the provision of these services, or regarding
              offers from our App or from our marketing partners. However, these
              companies do not have any independent right to own or share this
              information.
            </li>
            <li>
              To respond to legal investigations, court orders or legal
              processes, or to respond to claims that an ad or other content
              violated the rights of others or to defend ourselves against legal
              claims.
            </li>
          </ul>
        </li>
        <li>
          Information published on the pages of the App are information
          available to the public and is the information chosen by the User to
          be displayed to the public and not the personal information that was
          entered during the registration process.
        </li>
        <li>
          Personal information is information about you that identifies you,
          such as your name, address, e-mail, phone number, and sometimes,
          depending on the service you are using, financial information. The App
          collects and preserves such information in order to:
          <ul className="mt-2">
            <li>Enforce our policies</li>
            <li>Provide Our Services</li>
            <li>Resolve conflicts and disputes</li>
            <li>Collect Fees</li>
            <li>Troubleshooting</li>
            <li>Encourage safe trade policies</li>
            <li>Apply Our policies</li>
            <li>Customize user experience</li>
            <li>Measure interest in our services</li>
            <li>
              Improve our services and inform Users about the latest
              developments
            </li>
            <li>
              Send ads and marketing promotions according to your preferences
            </li>
          </ul>
        </li>
        <li>
          This policy does not apply to other affiliated Apps or channels not
          owned or controlled by SpotX. It also does not apply to employees or
          personnel that do not work for SpotX
        </li>
        <li>
          SpotX may use your posted units on social-media Apps to advertise for
          you or for itself.
        </li>
        <li>
          SpotX receives information from your computer, your Internet browser,
          and SpotX cookies automatically. This information includes your IP
          address. We also collect and preserve data about the pages you visited
          on the App.
        </li>
        <li>
          Users are not allowed to use our App to collect data about other Users
          or to send them annoying messages. By doing so, you will be violating
          Our Terms and Conditions and Privacy Policy.
        </li>
        <li>
          Our servers are located in the United States. By choosing to provide
          us with personal information, you consent to the transfer of this data
          to our servers.
        </li>
      </ul>
    </div>
  );
}
