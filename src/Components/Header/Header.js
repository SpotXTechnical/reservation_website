import Button from "../SharedComponents/Button/Button";
import Select from "react-select";
import { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { langAction } from "../../store";
import styles from "./header.module.css";
import { useRouter } from "next/router";
import { logOut, setAccessToken } from "../../store/Auth/authSlice";


export default function Header() {
  let { lang } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.auth);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState("");
  const dispatcher = useDispatch();
  const router = useRouter();
  console.log(userData);
  const handleNavigateToOffers = () => {
    router.push("/offers");
  };
  console.log("user", user);
  useEffect(() => {
    // const data = localStorage.getItem("user")
    //   ? JSON.parse(localStorage.getItem("user"))
    //   : "";
    // setUserData(data);
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
          router.push("/");
        }}
      >
        <img src="/assets/Logo.png" alt="Logo" />
      </div>
      <div className="col-sm-6 d-flex justify-content-end">
        <div className={styles.header_items_gap}>
          <div
            className="d-flex align-items-center gap-1 cursor-pointer"
            onClick={handleNavigateToOffers}
          >
            <img src="/assets/receipt-disscount.png" alt="offers" />
            <span className={styles.offers}>
              <FormattedMessage id="home.offers" />
            </span>
          </div>
          <div
            className="d-flex align-items-center gap-1 cursor-pointer"
            onClick={() => router.push("/reservations")}
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
              instanceId="long-value-select"
              id="long-value-select"
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
          {user ? (
            <div className={styles.profile_img_wrapper}>
              <img
                src={user.image || avatar}
                alt="profile-img"
                onClick={handleImageClick}
              ></img>
              {isMenuOpen && (
                <ul className={styles.logout_menu}>
                  <li
                    onClick={() => {
                      router.push("/profile");
                      setMenuOpen(false);
                    }}
                  >
                    <FormattedMessage id="home.profile" />
                  </li>
                  <li
                    onClick={() => {
                      router.push("/signin");
                      localStorage.removeItem("user");
                      localStorage.removeItem("access_token");
                      dispatcher(logOut(null));
                      dispatcher(setAccessToken(null));
                      setMenuOpen(false);
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
                  router.push("/signin");
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
