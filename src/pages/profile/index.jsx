import { FormattedMessage, useIntl } from "react-intl";
import { getProfile } from "../../app/Apis/AuthApis";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import store, { langAction } from "../../store";

export default function Profile() {
  let { lang } = useSelector((state) => state.language);
  const avatar = "/assets/avatar.png";
  const intl = useIntl();
  const router = useRouter();
  const [data, setData] = useState({});

  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }

  useEffect(() => {
    getProfile().then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
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
            </div>
          </>
        )}
        <div className="contact_section">
          <div>
            <p>
              <FormattedMessage id="contactUs" />
            </p>
            <span className="calls">
              <img src="/assets/call.png" alt="callUs" />
              <span>
                <FormattedMessage id="callNow" />
              </span>
            </span>
          </div>
          <div>
            <div>
              <p>
                <FormattedMessage id="downloadApp" />
              </p>
              <span className="helpText">
                <FormattedMessage id="downloadAppHelp" />
              </span>
            </div>
            <div className="app_images">
              <img
                src="/assets/app-store.png"
                alt="app-store"
                className="cursor-pointer"
              />
              <img
                src="/assets/google-play.png"
                alt="google-play"
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="cursor-pointer">
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
          <div className="cursor-pointer">
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
