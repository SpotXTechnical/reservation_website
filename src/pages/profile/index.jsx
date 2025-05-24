import { FormattedMessage, useIntl } from "react-intl";
import { getProfile } from "../../app/Apis/AuthApis";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import store, { langAction } from "../../store";
import Head from "next/head";
import AppStore from "../../../public/assets/appstore.svg";
import PlayStore from "../../../public/assets/googleplay.svg";
import CallNow from "../../../public/assets/Phone.svg";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  let { lang } = useSelector((state) => state.language);
  const avatar = "/assets/avatar.png";
  const intl = useIntl();
  const router = useRouter();
  const [data, setData] = useState({});
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      const language = storedLanguage ? storedLanguage : "en";
      store.dispatch(
        language === "ar" ? langAction.langAr() : langAction.langEn()
      );
    }
  }, []);

  useEffect(() => {
    if (user) {
      getProfile().then((res) => {
        setData(res.data);
      });
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Your Profile | SpotX</title>
        <meta name="description" content={"user Profile in SpotX"} />
      </Head>

      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="tw-min-h-screen tw-bg-gray-50 tw-py-6 tw-px-4 sm:tw-px-6 lg:tw-px-8"
      >
        <div className="tw-max-w-4xl tw-mx-auto">
          {/* Page Title */}
          <div className="tw-mb-8">
            <h2 className="tw-text-2xl sm:tw-text-3xl tw-font-bold tw-text-gray-900 tw-text-center">
              <FormattedMessage id="profile.title" />
            </h2>
          </div>

          {data && (
            <>
              {/* Profile Header Card */}
              <div className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6 sm:tw-p-8 tw-mb-8 tw-relative">
                {/* Edit Profile Button */}
                <button
                  className="tw-absolute tw-top-4 tw-right-4 tw-bg-[#44bcb7] hover:tw-text-white tw-p-3 tw-rounded-full hover:tw-bg-[#3ca7a1] tw-transition-colors tw-duration-200"
                  onClick={() => router.push("/profile/edit")}
                >
                  <svg
                    className="tw-w-5 tw-h-5 tw-text-[#fff]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span className="tw-sr-only">
                    <FormattedMessage id="edit" />
                  </span>
                </button>

                <div className="tw-flex tw-flex-col tw-items-center tw-text-center">
                  {/* Profile Image */}
                  <div className="tw-relative tw-mb-6">
                    <img
                      className="tw-w-24 tw-h-24 sm:tw-w-32 sm:tw-h-32 tw-rounded-full tw-object-cover tw-border-4 tw-border-blue-100 tw-shadow-md"
                      src={data.image ? data.image : avatar}
                      alt="profile"
                    />
                    <div className="tw-absolute tw-bottom-0 tw-right-0 tw-w-6 tw-h-6 tw-bg-green-500 tw-rounded-full tw-border-2 tw-border-white"></div>
                  </div>

                  {/* User Info */}
                  <div className="tw-mb-6">
                    <h3 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-2">
                      {data.name}
                    </h3>
                    <p className="tw-text-gray-600 tw-flex tw-items-center tw-justify-center tw-gap-2">
                      <svg
                        className="tw-w-4 tw-h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {data.phone}
                    </p>
                  </div>

                  {/* Transactions Button */}
                  <button
                    className="tw-bg-[#44bcb7] tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-font-medium hover:tw-bg-[#3ca7a1] tw-shadow-md hover:tw-shadow-lg tw-transition-all tw-duration-300"
                    onClick={() => router.push("/transactions")}
                  >
                    <FormattedMessage id="transactions" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Contact & App Sections */}
          <div className="tw-space-y-6">
            {/* Contact Us Card */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6">
              <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-4">
                <FormattedMessage id="contactUs" />
              </h3>
              <a
                href="tel:+201222381837"
                className="tw-flex tw-items-center tw-gap-3 tw-text-blue-600 hover:tw-text-blue-700 tw-transition-colors tw-duration-200"
              >
                <div className="tw-bg-green-100 tw-p-2 tw-rounded-full">
                  <Image src={CallNow} alt="callUs" className="tw-w-6 tw-h-6" />
                </div>
                <span className="tw-font-medium">+201222381837</span>
              </a>
            </div>

            {/* Download App Card */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6">
              <div className="tw-mb-4">
                <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-2">
                  <FormattedMessage id="downloadApp" />
                </h3>
                <p className="tw-text-gray-600 tw-text-sm">
                  <FormattedMessage id="downloadAppHelp" />
                </p>
              </div>
              <div className="tw-flex tw-gap-4 tw-flex-wrap">
                <Link
                  href="https://apps.apple.com/eg/app/spotx-app/id6444921625"
                  target="_blank"
                  className="tw-block hover:tw-scale-105 tw-transition-transform tw-duration-200"
                >
                  <Image
                    src={AppStore}
                    alt="app-store"
                    className="tw-h-12 tw-w-auto"
                  />
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.spotx.customer"
                  target="_blank"
                  className="tw-block hover:tw-scale-105 tw-transition-transform tw-duration-200"
                >
                  <Image
                    src={PlayStore}
                    alt="google-play"
                    className="tw-h-12 tw-w-auto"
                  />
                </Link>
              </div>
            </div>

            {/* Terms & Privacy Cards */}
            <div className="tw-space-y-4">
              <div
                className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-cursor-pointer hover:tw-shadow-lg tw-transition-shadow tw-duration-200"
                onClick={() => router.push("/terms")}
              >
                <div className="tw-flex tw-items-center tw-justify-between">
                  <h3 className="tw-text-lg tw-font-medium tw-text-gray-900">
                    <FormattedMessage id="termsAndConds" />
                  </h3>
                  <svg
                    className="tw-w-5 tw-h-5 tw-text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <div
                className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-cursor-pointer hover:tw-shadow-lg tw-transition-shadow tw-duration-200"
                onClick={() => router.push("/privacy")}
              >
                <div className="tw-flex tw-items-center tw-justify-between">
                  <h3 className="tw-text-lg tw-font-medium tw-text-gray-900">
                    <FormattedMessage id="privacyPolicy" />
                  </h3>
                  <svg
                    className="tw-w-5 tw-h-5 tw-text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
