import { FormattedMessage } from "react-intl";
import styles from "./Footer.module.css";
import { useRouter } from "next/router";
import CallUs from "../../../public/assets/callus.svg";
import Mail from "../../../public/assets/mail.svg";
import Address from "../../../public/assets/address.svg";
import Image from "next/image";
export default function Footer() {
  const router = useRouter();
  return (
    <div className={styles.footer_wrapper}>
      <div className="d-flex mb-4">
        <address className="col-sm-6 d-flex flex-column">
          <p className={styles.about_spotx}>
            <FormattedMessage id="SpotX" />
          </p>
          <p
            className={`d-flex align-items-center gap-2 ${styles.contact_row}`}
          >
            <Image {...CallUs} alt="phone" />
            <a href="tel:+201222381837">+201222381837</a>
          </p>
          <p
            className={`d-flex align-items-center gap-2 ${styles.contact_row}`}
          >
            <Image {...Mail} alt="phone" />
            <a href="mailto:info@spotx.app">info@spotx.app</a>
          </p>
          <p
            className={`d-flex align-items-center gap-2 ${styles.contact_row}`}
          >
            <Image {...Address} alt="phone" />
            الإسكندرية - قسم الرمل - ٦٩٦ طريق الحرية - لوران
          </p>
        </address>
        <div className="col-sm-3">
          <ul className={styles.list}>
            {/* <li>
              <FormattedMessage id="home.rentYourProperty" />
            </li> */}
            <li
              className="cursor-pointer"
              onClick={() => {
                router.push("/privacy");
              }}
            >
              <FormattedMessage id="home.privacyAndPolicy" />
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                router.push("/terms");
              }}
            >
              <FormattedMessage id="home.termsAndConditions" />
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                router.push("/policy");
              }}
            >
              <FormattedMessage id="Refund Policy" />
            </li>
          </ul>
        </div>
        <div className="col-sm-3">
          <ul>
            {/* <li>
              <FormattedMessage id="home.contactUs" />
            </li> */}
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
