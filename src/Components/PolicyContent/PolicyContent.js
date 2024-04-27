import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "../../pages/policy/policy.module.css";

export default function PolicyContent() {
  return (
    <>
      <div className={styles.policy_container}>
        <img src="/assets/Logo.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>
          <FormattedMessage id="cancellationAndRefundPolicy.title" />
        </h1>
        <section>
          <h2>
            <FormattedMessage id="cancellationAndRefund.sections.cancellationAndRefund.title" />
          </h2>
          <ol>
            <li>
              <FormattedMessage id="cancellationAndRefund.sections.cancellationAndRefund.content.0" />
              <ul>
                <li>
                  <FormattedMessage id="cancellationAndRefund.sections.cancellationAndRefund.content.1" />
                </li>
                <li>
                  <FormattedMessage id="cancellationAndRefund.sections.cancellationAndRefund.content.2" />
                </li>
                <li>
                  <FormattedMessage id="cancellationAndRefund.sections.cancellationAndRefund.content.3" />
                </li>
                <li>
                  <FormattedMessage id="cancellationAndRefund.sections.cancellationAndRefund.content.4" />
                </li>
                <li>
                  <FormattedMessage id="cancellationAndRefund.sections.cancellationAndRefund.content.5" />
                </li>
              </ul>
            </li>
            <li>
              <FormattedMessage id="cancellationAndRefund.sections.cancellationAndRefund.content.6" />
            </li>
          </ol>
        </section>
        <section>
          <h2>
            <FormattedMessage id="cancellationAndRefund.sections.cancellationByTheHost.title" />
          </h2>
          <ol>
            <li>
              <FormattedMessage id="cancellationAndRefund.sections.cancellationByTheHost.content.0" />
            </li>
            <li>
              <FormattedMessage id="cancellationAndRefund.sections.cancellationByTheHost.content.1" />
            </li>
          </ol>
        </section>
        <section>
          <h2>
            <FormattedMessage id="cancellationAndRefund.sections.communicationAndInquiries.title" />
          </h2>
          <ul>
            <li>
              <FormattedMessage id="cancellationAndRefund.sections.communicationAndInquiries.content.0" />
            </li>
            <li>
              <FormattedMessage id="cancellationAndRefund.sections.communicationAndInquiries.content.1" />
              <a href="mailto:support@spotx.app">support@spotx.app</a>
            </li>
          </ul>
          <p>
            <FormattedMessage id="cancellationAndRefundPolicy.note" />
          </p>
        </section>
      </div>
    </>
  );
}
