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
      </Head>{" "}
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="profile_wrapper container"
      >
        <h2 className="title">
          <FormattedMessage id="profile.title" />
        </h2>
        {data && (
          <>
            <div className="img_wrapper">
              {" "}
              <img
                className="main_img"
                src={data.image ? data.image : avatar}
                alt="signin"
              />
            </div>
            <div
              className="edit_profile"
              onClick={() => router.push("/profile/edit")}
            >
              <div>
                <span>
                  <img
                    src={data.image ? data.image : "/assets/edit.png"}
                    alt="callUs"
                  />
                </span>
              </div>
              <div>
                <span className="text-grey">
                  <FormattedMessage id="edit" />
                </span>
              </div>
            </div>
            <div className="head_section">
              <div className="img_wrapper">
                <div></div>
              </div>
              <h3>{data.name}</h3>
              <p className="mt-3 text-grey">{data.phone}</p>
              <button
                className="transactions-btn"
                onClick={() => router.push("/transactions")}
              >
                <FormattedMessage id="transactions" />
              </button>
            </div>
          </>
        )}
        <div className="contact_section">
          <div>
            <p>
              <FormattedMessage id="contactUs" />
            </p>
            <span className="calls">
              <a href="tel:+201222381837">
                <Image src={CallNow} alt="callUs" />
                <span className="phone">+201222381837</span>
              </a>
            </span>
          </div>
          <div className="download_app">
            <div>
              <p>
                <FormattedMessage id="downloadApp" />
              </p>
              <span className="helpText">
                <FormattedMessage id="downloadAppHelp" />
              </span>
            </div>
            <div className="app_images">
              <Link
                href="https://apps.apple.com/eg/app/spotx-app/id6444921625"
                target="_blank"
              >
                <Image
                  src={AppStore}
                  alt="app-store"
                  className="cursor-pointer"
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.spotx.customer"
                target="_blank"
              >
                <Image
                  src={PlayStore}
                  alt="google-play"
                  className="cursor-pointer"
                />
              </Link>
            </div>
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/terms")}>
            <p>
              <FormattedMessage id="termsAndConds" />
            </p>
            <span className="rightArrow">
              <img
                src="/assets/green-right-arrow.png"
                alt="green-right-arrow"
              />
            </span>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/privacy")}
          >
            <p>
              <FormattedMessage id="privacyPolicy" />
            </p>
            <span className="rightArrow">
              <img
                src="/assets/green-right-arrow.png"
                alt="green-right-arrow"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
