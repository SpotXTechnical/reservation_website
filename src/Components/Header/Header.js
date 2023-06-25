import Button from "../SharedComponents/Button/Button";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { langAction } from "../../store";
import styles from "./header.module.css";

export default function Header() {
  let { lang } = useSelector((state) => state.language);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState("");
  const dispatcher = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "";
    setUserData(data);
  }, []);
  const avatar = "/assets/avatar.png";

  const handleImageClick = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <div
      className={`container_wrapper d-flex align-items-center justify-content-between ${styles.header_wrapper}`}
    >
      <div
        className="col-sm-6 cursor-pointer"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <img src="/assets/Logo.png" alt="Logo" />
      </div>
      <div className="col-sm-6 d-flex justify-content-end">
        <div className={styles.header_items_gap}>
          <div className="d-flex align-items-center gap-1 cursor-pointer">
            <img src="/assets/receipt-disscount.png" alt="offers" />
            <span className={styles.offers}>
              <FormattedMessage id="home.offers" />
            </span>
          </div>
          <div
            className="d-flex align-items-center gap-1 cursor-pointer"
            onClick={() => (window.location.href = "/reservations")}
          >
            <img src="/assets/shopping-bag.png" alt="reservations" />
            <span className={styles.menu_item}>
              <FormattedMessage id="home.reservations" />
            </span>
          </div>
          <div className="d-flex align-items-center gap-1 cursor-pointer">
            <img src="/assets/global.png" alt="Language" />

            <Select
              className={styles.language_select}
              classNamePrefix="select"
              onChange={(e) => {
                localStorage.setItem("language", e.value);
                e.value === "ar"
                  ? dispatcher(langAction.langAr())
                  : dispatcher(langAction.langEn());
              }}
              value={
                lang === "ar"
                  ? {
                      label: "Ar",
                      value: "ar",
                    }
                  : {
                      label: "En",
                      value: "en",
                    }
              }
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  color: "#a2a2a2",
                  fontSize: "14px",
                }),
              }}
              name="Language"
              options={[
                {
                  label: "Ar",
                  value: "ar",
                },
                {
                  label: "En",
                  value: "en",
                },
              ]}
            />
          </div>

          {/* <div
            className={`d-flex align-items-center gap-1 cursor-pointer ${styles.notifications_container}`}
          >
            <img src="/assets/notification.png" alt="notifications" />
            <div className={styles.notification_number}>2</div>
          </div> */}
          {userData ? (
            <div className={styles.profile_img_wrapper}>
              <img
                src={userData.image || avatar}
                alt="profile-img"
                onClick={handleImageClick}
              ></img>
              {isMenuOpen && (
                <ul className={styles.logout_menu}>
                  <li
                    onClick={() => {
                      window.location.href = "/profile";
                    }}
                  >
                    <FormattedMessage id="home.profile" />
                  </li>
                  <li
                    onClick={() => {
                      window.location.href = "/signin";
                      localStorage.removeItem("user");
                      localStorage.removeItem("access_token");
                    }}
                  >
                    <FormattedMessage id="home.Logout" />
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div>
              <div
                onClick={() => {
                  window.location.href = "/signin";
                }}
              >
                <Button text="SIGN IN" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
