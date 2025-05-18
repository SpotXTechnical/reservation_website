import Link from "next/link";
import { FormattedMessage } from "react-intl";
import PlayStore from "../../../public/assets/googleplay.svg";
import AppStore from "../../../public/assets/appstore.svg";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="tw-bg-gradient-to-br tw-from-[#1A2B3C] tw-to-[#2C3E50] tw-text-white tw-py-12 tw-px-4">
      <div className="tw-container tw-mx-auto tw-max-w-6xl">
        {/* Main Footer Content */}
        <div className="tw-grid md:tw-grid-cols-4 tw-gap-8">
          {/* Company Info */}
          <div className="tw-space-y-4">
            <h3 className="tw-text-2xl tw-font-bold tw-text-yellow-400 tw-mb-4">
              SpotX
            </h3>
            <div className="tw-space-y-3">
              <div className="tw-flex tw-items-center tw-space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="tw-h-6 tw-w-6 tw-text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+201222381837"
                  className="tw-hover:text-yellow-400 tw-transition-colors"
                >
                  +201222381837
                </a>
              </div>
              <div className="tw-flex tw-items-center tw-space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="tw-h-6 tw-w-6 tw-text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@spotx.app"
                  className="tw-hover:text-yellow-400 tw-transition-colors"
                >
                  info@spotx.app
                </a>
              </div>
              <div className="tw-flex tw-items-center tw-space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="tw-h-6 tw-w-6 tw-text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>الإسكندرية - قسم الرمل - ٦٩٦ طريق الحرية - لوران</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="tw-text-xl tw-font-semibold tw-text-yellow-400 tw-mb-4">
              <FormattedMessage id="quickLinks" />
            </h4>
            <ul className="tw-space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="hover:tw-text-yellow-400 tw-transition-colors"
                >
                  <FormattedMessage id="aboutUs" />
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:tw-text-yellow-400 tw-transition-colors"
                >
                  <FormattedMessage id="privacyPolicy" />
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:tw-text-yellow-400 tw-transition-colors"
                >
                  <FormattedMessage id="home.termsAndConditions" />
                </Link>
              </li>
              <li>
                <Link
                  href="/policy"
                  className="hover:tw-text-yellow-400 tw-transition-colors"
                >
                  <FormattedMessage id="Refund_Policy" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Download Our App */}
          <div>
            <h4 className="tw-text-xl tw-font-semibold tw-text-yellow-400 tw-mb-4">
              <FormattedMessage id="downloadOurApp" />
            </h4>
            <div className="tw-flex tw-flex-col tw-gap-4 sm:tw-gap-4 tw-items-start">
              <Link
                href="https://apps.apple.com/eg/app/spotx-app/id6444921625"
                target="_blank"
                rel="noreferrer"
                className="tw-inline-block tw-transform tw-transition-transform hover:tw-scale-105"
              >
                <Image
                  src={AppStore}
                  width={150}
                  height={45}
                  alt="App Store"
                  className="tw-max-w-[150px] sm:tw-w-auto"
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.spotx.customer"
                target="_blank"
                rel="noreferrer"
                className="tw-inline-block tw-transform tw-transition-transform hover:tw-scale-105"
              >
                <Image
                  src={PlayStore}
                  width={150}
                  height={45}
                  alt="Google Play"
                  className="tw-max-w-[150px] sm:tw-w-auto"
                />
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="tw-text-xl tw-font-semibold tw-text-yellow-400 tw-mb-4">
              <FormattedMessage id="follow_us" />
            </h4>
            <div className="tw-flex tw-space-x-4">
              <a
                href="https://www.facebook.com/people/SpotX/100089666109369/"
                target="_blank"
                rel="noreferrer"
                className="hover:tw-text-yellow-400 tw-transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="tw-hover:text-yellow-400"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/spotx126/"
                target="_blank"
                rel="noreferrer"
                className="hover:tw-text-yellow-400 tw-transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="tw-hover:text-yellow-400"
                >
                  <path d="M12 2c-2.754 0-3.445.013-4.63.067-1.185.054-1.995.242-2.706.516a5.392 5.392 0 00-1.953 1.272 5.392 5.392 0 00-1.272 1.953c-.274.71-.462 1.52-.516 2.706C1.013 8.555 1 9.246 1 12s.013 3.445.067 4.63c.054 1.185.242 1.995.516 2.706a5.392 5.392 0 001.272 1.953 5.392 5.392 0 001.953 1.272c.71.274 1.52.462 2.706.516 1.185.054 1.876.067 4.63.067s3.445-.013 4.63-.067c1.185-.054 1.995-.242 2.706-.516a5.392 5.392 0 001.953-1.272 5.392 5.392 0 001.272-1.953c.274-.71.462-1.52.516-2.706.054-1.185.067-1.876.067-4.63s-.013-3.445-.067-4.63c-.054-1.185-.242-1.995-.516-2.706a5.392 5.392 0 00-1.272-1.953 5.392 5.392 0 00-1.953-1.272c-.71-.274-1.52-.462-2.706-.516C15.445 2.013 14.754 2 12 2zm0 2.022c2.715 0 3.341.013 4.516.067 1.09.05 1.68.232 2.075.385.521.203.891.445 1.28.834.389.389.63.76.834 1.28.153.395.335.985.385 2.075.054 1.175.067 1.801.067 4.516s-.013 3.341-.067 4.516c-.05 1.09-.232 1.68-.385 2.075-.203.521-.445.891-.834 1.28-.389.389-.76.63-1.28.834-.395.153-.985.335-2.075.385-1.175.054-1.801.067-4.516.067s-3.341-.013-4.516-.067c-1.09-.05-1.68-.232-2.075-.385-.521-.203-.891-.445-1.28-.834-.389-.389-.63-.76-.834-1.28-.153-.395-.335-.985-.385-2.075-.054-1.175-.067-1.801-.067-4.516s.013-3.341.067-4.516c.05-1.09.232-1.68.385-2.075.203-.521.445-.891.834-1.28.389-.389.76-.63 1.28-.834.395-.153.985-.335 2.075-.385 1.175-.054 1.801-.067 4.516-.067zm0 3.45a6.55 6.55 0 100 13.1 6.55 6.55 0 000-13.1zm0 10.8a4.25 4.25 0 110-8.5 4.25 4.25 0 010 8.5zm8.35-8.65a1.53 1.53 0 11-3.06 0 1.53 1.53 0 013.06 0z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@spotx126"
                target="_blank"
                rel="noreferrer"
                className="hover:tw-text-yellow-400 tw-transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="tw-hover:text-yellow-400"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.14 6.14 0 00-1-.08 6 6 0 106 6v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.09-.12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="tw-my-8 tw-border-gray-200" />

        {/* Copyright */}
        <div className="tw-text-center tw-text-sm tw-text-gray-400">
          <p>
            <FormattedMessage
              id="copyRights"
              values={{ year: new Date().getFullYear() }}
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
