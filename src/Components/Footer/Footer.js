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
            <Image src={CallUs} alt="phone" />
            <a href="tel:+201222381837">+201222381837</a>
          </p>
          <p
            className={`d-flex align-items-center gap-2 ${styles.contact_row}`}
          >
            <Image src={Mail} alt="phone" />
            <a href="mailto:info@spotx.app">info@spotx.app</a>
          </p>
          <p
            className={`d-flex align-items-center gap-2 ${styles.contact_row}`}
          >
            <Image src={Address} alt="phone" />
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
          <p className={`${styles.yellow_color} fs-6 mb-0`}>
            {" "}
            <FormattedMessage id="Follow Us" />
          </p>
          <ul>
            <li className="d-flex gap-2">
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
                    d="M11.9997 24C11.3551 24 10.7079 23.9486 10.0774 23.8464C7.29423 23.3982 4.74348 21.9676 2.89605 19.8182C1.02857 17.6455 0 14.869 0 11.9997C0 5.38268 5.38336 0 11.9997 0C18.616 0 24 5.38335 24 11.9997C24 14.9131 22.9434 17.7223 21.0238 19.9097C19.1229 22.0771 16.5114 23.4884 13.6701 23.8845C13.1204 23.9613 12.558 24 11.9997 24ZM11.9997 0.801492C5.82485 0.801492 0.801492 5.82484 0.801492 11.9997C0.801492 17.528 4.75619 22.1779 10.205 23.0549C11.3037 23.2319 12.4538 23.2446 13.5592 23.0903C19.0541 22.3249 23.1978 17.5567 23.1978 11.9997C23.1978 5.82484 18.1745 0.801492 11.999 0.801492H11.9997Z"
                    fill="white"
                  />
                  <path
                    d="M13.6146 9.71409V12.2408H16.7404L16.2455 15.6451H13.6146V23.4877C13.0869 23.5612 12.5473 23.5993 11.9996 23.5993C11.3671 23.5993 10.7466 23.5485 10.1415 23.451V15.6451H7.25879V12.2408H10.1415V9.1497C10.1415 7.23147 11.6964 5.6759 13.6153 5.6759V5.67791C13.6206 5.67791 13.6259 5.6759 13.6313 5.6759H16.7411V8.61938H14.7093C14.1048 8.61938 13.6153 9.10896 13.6153 9.71342L13.6146 9.71409Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/spotx126/"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className={styles.facebook_icon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 13.03V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.6361 7H17.6477"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@spotx126"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className={styles.facebook_icon}
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2349 24C11.5903 24 10.9431 23.9486 10.3125 23.8464C7.52929 23.3982 4.97851 21.9676 3.13102 19.8182C1.2635 17.6455 0.234863 14.869 0.234863 11.9997C0.234863 5.38268 5.61837 0 12.2349 0C18.8514 0 24.2349 5.38335 24.2349 11.9997C24.2349 14.9131 23.1782 17.7223 21.2586 19.9097C19.3577 22.0771 16.746 23.4884 13.9047 23.8845C13.355 23.9613 12.7926 24 12.2342 24H12.2349ZM12.2349 0.801492C6.05987 0.801492 1.03638 5.82484 1.03638 11.9997C1.03638 17.528 4.99118 22.1779 10.4401 23.0549C11.5389 23.2319 12.6891 23.2446 13.7945 23.0903C19.2895 22.3249 23.4333 17.5567 23.4333 11.9997C23.4333 5.82484 18.4099 0.801492 12.2349 0.801492Z"
                    fill="white"
                  />
                  <path
                    d="M17.9108 8.75435V10.9705C17.5227 10.9331 17.0204 10.8449 16.4627 10.6405C15.7353 10.374 15.1937 10.0094 14.8397 9.72683V14.2072L14.831 14.1931C14.837 14.282 14.8397 14.3721 14.8397 14.4636C14.8397 16.6891 13.0296 18.4998 10.8034 18.4998C8.57715 18.4998 6.76709 16.6885 6.76709 14.4636C6.76709 12.2388 8.57715 10.4268 10.8034 10.4268C11.0211 10.4268 11.2349 10.4442 11.4439 10.4776V12.6623C11.2429 12.5902 11.0278 12.5514 10.8034 12.5514C9.74937 12.5514 8.89109 13.409 8.89109 14.4636C8.89109 15.5183 9.74937 16.3759 10.8034 16.3759C11.8573 16.3759 12.7157 15.5176 12.7157 14.4636C12.7157 14.4242 12.715 14.3848 12.7123 14.3454V5.63855H14.9278C14.9358 5.82623 14.9438 6.01525 14.9512 6.20293C14.9659 6.57229 15.0975 6.92695 15.3266 7.21749C15.5958 7.55879 15.9925 7.95553 16.5509 8.27212C17.0732 8.568 17.5635 8.6949 17.9108 8.75502V8.75435Z"
                    fill="white"
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
