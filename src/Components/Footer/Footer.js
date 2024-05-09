import { FormattedMessage } from "react-intl";
import styles from "./Footer.module.css";
import { useRouter } from "next/router";
import CallUs from "../../../public/assets/callus.svg";
import Mail from "../../../public/assets/mail.svg";
import Address from "../../../public/assets/address.svg";
import Facebook from "../../../public/assets/facebook.svg";
import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  const router = useRouter();
  return (
    <div className={styles.footer_wrapper}>
      <div className="d-flex flex-md-row">
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
            <li className="cursor-pointer">
              <Link href="/about-us" className={styles.link}>
                <FormattedMessage id="About us" />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href="/privacy" className={styles.link}>
                <FormattedMessage id="home.privacyAndPolicy" />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href="/terms" className={styles.link}>
                <FormattedMessage id="home.termsAndConditions" />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href="/policy" className={styles.link}>
                <FormattedMessage id="Refund Policy" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-3 d-flex flex-column gap-3 justify-content-start">
          <ul>
            <li>
              <p className={`${styles.yellow_color} fs-6`}>
                {" "}
                <FormattedMessage id="Follow Us" />
              </p>
              <a
                href="https://www.facebook.com/people/SpotX/100089666109369/"
                target="_blank"
                rel="noreferrer"
              >
                {/* <Image {...Facebook} alt="facebook icon" /> */}
                <svg
                  className={styles.facebook_icon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 9.29999V12.25H16.63C16.82 12.25 16.96 12.42 16.92 12.61L16.54 14.51C16.51 14.65 16.39 14.75 16.25 14.75H14V22H11V14.75H9.29999C9.12999 14.75 9 14.62 9 14.45V12.55C9 12.38 9.12999 12.25 9.29999 12.25H11V9C11 7.34 12.34 6 14 6H16.7C16.87 6 17 6.12999 17 6.29999V8.70001C17 8.87001 16.87 9 16.7 9H14.3C14.13 9 14 9.12999 14 9.29999Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                  />
                  <path
                    d="M2 12.83V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className={styles.copy_rights}>
          Copyright © 2021. SpotX - The Number One Platform in Egypt. All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
}
