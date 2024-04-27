import { FormattedMessage } from "react-intl";
import styles from "./privacy.module.css";
export default function Privacy() {
  return (
    <div className={styles.privacy_container}>
      <section>
        <h1 className={styles.header}>
          <FormattedMessage id="home.privacy" />
        </h1>
        <p>
          <FormattedMessage id="spotXPrivacyPolicy.introduction" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="spotXPrivacyPolicy.informationWeCollect.heading" />
        </h2>
        <ul>
          <li>
            <FormattedMessage id="spotXPrivacyPolicy.informationWeCollect.personalInformation" />
          </li>
          <li>
            <FormattedMessage id="spotXPrivacyPolicy.informationWeCollect.usageInformation" />
          </li>
        </ul>
      </section>
      <section>
        <h2>
          <FormattedMessage id="spotXPrivacyPolicy.howWeUseYourInformation.heading" />
        </h2>
        <p>
          <FormattedMessage id="spotXPrivacyPolicy.howWeUseYourInformation.purposes" />
        </p>
        <ul>
          <li>
            <FormattedMessage id="spotXPrivacyPolicy.howWeUseYourInformation.providingServices" />
          </li>
          <li>
            <FormattedMessage id="spotXPrivacyPolicy.howWeUseYourInformation.sendingOffers" />
          </li>
          <li>
            <FormattedMessage id="spotXPrivacyPolicy.howWeUseYourInformation.legalCompliance" />
          </li>
          <li>
            <FormattedMessage id="spotXPrivacyPolicy.howWeUseYourInformation.postedContent" />
          </li>
        </ul>
      </section>
      <section>
        <h2>
          <FormattedMessage id="spotXPrivacyPolicy.informationSharing.heading" />
        </h2>
        <p>
          <FormattedMessage id="spotXPrivacyPolicy.informationSharing.intro" />
        </p>
        <ul>
          <li>
            <FormattedMessage id="spotXPrivacyPolicy.informationSharing.trustedPartners" />
          </li>
          <li>
            <FormattedMessage id="spotXPrivacyPolicy.informationSharing.legalDisclosure" />
          </li>
          <li>
            <FormattedMessage id="spotXPrivacyPolicy.informationSharing.socialMediaAds" />
          </li>
        </ul>
      </section>
      <section>
        <h2>
          <FormattedMessage id="spotXPrivacyPolicy.yourChoices.heading" />
        </h2>
        <p>
          <FormattedMessage id="spotXPrivacyPolicy.yourChoices.intro" />
        </p>
        <ul>
          <li>
            <FormattedMessage id="spotXPrivacyPolicy.yourChoices.optOutPromo" />
          </li>
          <li>
            <FormattedMessage id="spotXPrivacyPolicy.yourChoices.updateInformation" />
          </li>
        </ul>
      </section>
      <section>
        <h2>
          <FormattedMessage id="spotXPrivacyPolicy.dataRetention.heading" />
        </h2>
        <p>
          <FormattedMessage id="spotXPrivacyPolicy.dataRetention.policy" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="spotXPrivacyPolicy.internationalTransfer.heading" />
        </h2>
        <p>
          <FormattedMessage id="spotXPrivacyPolicy.internationalTransfer.consent" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="spotXPrivacyPolicy.policyScope.heading" />
        </h2>
        <p>
          <FormattedMessage id="spotXPrivacyPolicy.policyScope.appliesTo" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="spotXPrivacyPolicy.prohibitedActivities.heading" />
        </h2>
        <p>
          <FormattedMessage id="spotXPrivacyPolicy.prohibitedActivities.dataCollection" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="spotXPrivacyPolicy.contactUs.heading" />
        </h2>
        <p>
          <FormattedMessage id="spotXPrivacyPolicy.contactUs.info" />{" "}
          <a href="mailto:support@spotx.app">support@spotx.app</a>
        </p>
      </section>
    </div>
  );
}
