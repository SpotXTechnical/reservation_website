import { FormattedMessage } from "react-intl";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer_wrapper}>
      <div className="d-flex mb-4">
        <div className="col-sm-6">
          <p className={styles.about_spotx}>
            <FormattedMessage id="home.mostPopularProperties" />
          </p>
          <span className={styles.about}>
            “Maecenas faucibus mollis interdum. Nullamion etaquis risus eget
            urna mollis ornare vel eu leonardifaucibus mollis interdum”...{" "}
          </span>
        </div>
        <div className="col-sm-3">
          <ul>
            <li>
              <FormattedMessage id="home.rentYourProperty" />
            </li>
            <li>
              <FormattedMessage id="home.privacyAndPolicy" />
            </li>
            <li>
              <FormattedMessage id="home.termsAndConditions" />
            </li>
          </ul>
        </div>
        <div className="col-sm-3">
          <ul>
            <li>
              <FormattedMessage id="home.contactUs" />
            </li>
            <li>
              <FormattedMessage id="home.FAQ" />
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className={styles.copy_rights}>
          Copyright © 2015 - 2021. Traview - The Number One Platform in Egypt.
          All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
