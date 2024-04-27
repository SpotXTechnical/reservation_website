import { FormattedMessage } from "react-intl";
import styles from "./terms.module.css";
export default function Terms() {
  return (
    <div className={styles.policy_container}>
      <h1 className={styles.header}>
        <FormattedMessage id="termsAndConditions.title" />
      </h1>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.introduction" />
        </h2>
        <p className="terms_paragraph">
          <FormattedMessage id="termsAndConditions.introduction.intro" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.scope.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.scope.agreement" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.leases.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.leases.conclusion" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.legal.compliance.header" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.legal.compliance" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.userResponsibilities.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.userResponsibilities.accountAccess" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.confidentiality.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.confidentiality.policy" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.servicesAndFees.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.servicesAndFees.freeAndPaid" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.communication.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.communication.channels" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.technicalSupport.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.technicalSupport.providedBy" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.disclaimer.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.disclaimer.noGuarantee" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.intellectualProperty.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.intellectualProperty.noUse" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.thirdPartySites.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.thirdPartySites.noEndorsement" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.bookingProcess.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.bookingProcess.agreement" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.securityDeposit.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.securityDeposit.requirement" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.reviewSystem.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.reviewSystem.permission" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.durationTermination.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.durationTermination.agreementValidity" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.illegalConduct.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.illegalConduct.termination" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.spotxLiability.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.spotxLiability.contractual" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.closingProvisions.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.closingProvisions.assignment" />
        </p>
      </section>
      <section>
        <h2>
          <FormattedMessage id="termsAndConditions.contactUs.heading" />
        </h2>
        <p>
          <FormattedMessage id="termsAndConditions.contactUs.info" />
          <a href="mailto:support@spotx.app">support@spotx.app</a>
        </p>
      </section>
    </div>
  );
}
