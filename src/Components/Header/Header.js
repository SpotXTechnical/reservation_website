import Button from "../SharedComponents/Button/Button";
import Select from "react-select";
import { useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { langAction } from "../../store";
import styles from "./header.module.css";
import { useRouter } from "next/router";
import { logOut, setAccessToken } from "../../store/Auth/authSlice";
import Link from "next/link";
import Discount from "../../../public/assets/receipt-disscount.svg";
import Shopping from "../../../public/assets/shopping-bag.svg";
import Account from "../../../public/assets/Account.svg";
import Glob from "../../../public/assets/global.svg";
import Close from "../../../public/assets/close.svg";
import Menu from "../../../public/assets/menu.svg";
import Login from "../../../public/assets/login.svg";

import Image from "next/image";

export default function Header() {
  let { lang } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.auth);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [sideBarStatus, setSideBarStatus] = useState(false);
  const [userData, setUserData] = useState("");
  const dispatcher = useDispatch();
  const router = useRouter();
  const menuRef = useRef(null);

  const handleNavigateToOffers = () => {
    router.push("/offers");
  };
  const handleReservationRouting = () => {
    if (localStorage.getItem("access_token")) {
      router.push("/reservations");
    } else {
      router.push("/signin");
    }
  };
  const handleOpenSideBar = () => {
    setSideBarStatus(!sideBarStatus);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const avatar = "/assets/avatar.png";

  const handleImageClick = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <div
      className={`container_wrapper d-flex align-items-center justify-content-between ${styles.header_wrapper}`}
    >
      <div className="col-sm-6">
        <Link className="col-1  cursor-pointer" href="/">
          <img src="/assets/Logo.png" alt="Logo" />
        </Link>
      </div>
      <div
        className={`col-sm-6 d-flex justify-content-end ${styles.hide_navbar}`}
      >
        <div className={styles.header_items_gap}>
          <Link
            className="d-flex align-items-center gap-1 cursor-pointer"
            href="/offers"
          >
            <img src="/assets/receipt-disscount.png" alt="offers" />
            <span className={styles.offers}>
              <FormattedMessage id="home.offers" />
            </span>
          </Link>
          <div
            className="d-flex align-items-center gap-1 cursor-pointer"
            onClick={handleReservationRouting}
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
            <div className={styles.profile_img_wrapper} ref={menuRef}>
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
                    className={styles.profile_menu}
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
                    className={styles.profile_menu}
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
      <div>
        <Image
          src={Menu}
          alt="menu icon"
          className={`${styles.menu_icon}`}
          onClick={handleOpenSideBar}
        />
      </div>
      <div className={`small_screen ${sideBarStatus ? "small_screen_on" : ""}`}>
        <Image
          src={Close}
          alt="close"
          className={styles.close_btn}
          onClick={handleOpenSideBar}
        />
        <ul
          className={`${styles.list} gap-4 d-flex flex-column align-items-center justify-content-center`}
        >
          <li>
            <Link
              href="/offers"
              className={`d-flex align-items-center gap-2`}
              onClick={handleOpenSideBar}
            >
              <Image src={Discount} alt="disount image" />
              Offers
            </Link>
          </li>
          <li>
            <Link
              href={`${user ? "/reservations" : "/signin"}`}
              className={`d-flex align-items-center gap-2`}
              onClick={handleOpenSideBar}
            >
              <Image src={Shopping} alt="reservation image" />
              Reservations
            </Link>
          </li>
          {user ? (
            <li>
              <Link
                href="/profile"
                className={`d-flex align-items-center gap-2`}
                onClick={handleOpenSideBar}
              >
                <Image src={Account} alt="account image" />
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link
                href="/signin"
                onClick={handleOpenSideBar}
                className={`d-flex align-items-center gap-2`}
              >
                <Image src={Login} alt="account image" />
                Sign In
              </Link>
            </li>
          )}
          <li className="d-flex gap-3">
            <Image src={Glob} alt="account image" />

            <Select
              className={styles.language_select}
              classNamePrefix="select"
              instanceId="long-value-select2"
              id="long-value-select2"
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
          </li>
        </ul>
      </div>
    </div>
  );
}
