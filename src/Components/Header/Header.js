import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { langAction } from "../../store";
import { logOut, setAccessToken } from "../../store/Auth/authSlice";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// Import icons
import Logo from "../../../public/assets/Logo.svg";
import DiscountIcon from "../../../public/assets/receipt-disscount.svg";
import ShoppingIcon from "../../../public/assets/shopping-bag.svg";
import GlobIcon from "../../../public/assets/global.svg";
import CloseIcon from "../../../public/assets/close.svg";
import MenuIcon from "../../../public/assets/menu.svg";
import LoginIcon from "../../../public/assets/login.svg";
import AccountIcon from "../../../public/assets/Account.svg";

export default function Header() {
  const { lang } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.auth);
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatcher = useDispatch();
  const router = useRouter();
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const langDropdownRef = useRef(null);

  const handleReservationRouting = () => {
    if (localStorage.getItem("access_token")) {
      router.push("/reservations");
    } else {
      router.push("/signin");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setLangDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest("[data-menu-toggle]")
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleLanguage = (value) => {
    localStorage.setItem("language", value);
    value === "ar"
      ? dispatcher(langAction.langAr())
      : dispatcher(langAction.langEn());

    setMobileMenuOpen(false);
  };

  const toggleDesktopLanguage = (value) => {
    localStorage.setItem("language", value);
    value === "ar"
      ? dispatcher(langAction.langAr())
      : dispatcher(langAction.langEn());

    setLangDropdownOpen(false);
  };

  const handleLogout = () => {
    router.push("/signin");
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    dispatcher(logOut(null));
    dispatcher(setAccessToken(null));
    setMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const avatar = "/assets/avatar.png";

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  return (
    <header className="tw-relative tw-w-full tw-bg-white tw-shadow-sm">
      <div className="tw-container tw-mx-auto tw-px-4 tw-py-3">
        <div className="tw-flex tw-items-center tw-justify-between">
          {/* Logo */}
          <Link href="/" className="tw-flex tw-items-center">
            <Image
              src={Logo}
              alt="Logo"
              width={120}
              height={40}
              className="tw-h-10 tw-w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="tw-hidden md:tw-flex tw-items-center tw-space-x-8">
            <Link
              href="/offers"
              className="tw-group tw-flex tw-items-center tw-space-x-2 tw-text-[#a2a2a2] hover:tw-text-[#464343] tw-transition-all tw-duration-300 tw-font-medium"
            >
              <Image src={DiscountIcon} alt="Offers" width={20} height={20} />
              <span className="tw-text-sm tw-font-medium ">
                <FormattedMessage id="home.offers" />
              </span>
            </Link>

            <button
              onClick={handleReservationRouting}
              className="tw-group tw-flex tw-items-center tw-space-x-2 tw-text-[#a2a2a2] hover:tw-text-[#464343] tw-transition tw-duration-300 tw-font-medium"
            >
              <Image
                src={ShoppingIcon}
                alt="Reservations"
                width={20}
                height={20}
              />
              <span className="tw-text-sm tw-font-medium ">
                <FormattedMessage id="home.reservations" />
              </span>
            </button>

            {/* Language Selector */}
            <div className="tw-relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!isLangDropdownOpen)}
                className="tw-flex tw-items-center tw-space-x-2 tw-text-gray-600 hover:tw-text-primary tw-transition tw-duration-200"
              >
                <Image src={GlobIcon} alt="Language" width={20} height={20} />
                <span className="tw-text-sm tw-font-medium">
                  {lang === "ar" ? "العربية" : "English"}
                </span>
                <svg
                  className={`tw-h-4 tw-w-4 tw-transition-transform ${
                    isLangDropdownOpen ? "tw-rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isLangDropdownOpen && (
                <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-40 tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-z-10">
                  <div className="tw-py-1">
                    <button
                      onClick={() => toggleDesktopLanguage("en")}
                      className={`tw-flex tw-items-center tw-w-full tw-px-4 tw-py-2 tw-text-left tw-text-sm ${
                        lang === "en"
                          ? "tw-bg-gray-100 tw-text-primary tw-font-medium"
                          : "tw-text-gray-700 hover:tw-bg-gray-50"
                      }`}
                    >
                      <span
                        className={`tw-mr-2 ${
                          lang === "en" ? "tw-opacity-100" : "tw-opacity-0"
                        }`}
                      >
                        ✓
                      </span>
                      English
                    </button>
                    <button
                      onClick={() => toggleDesktopLanguage("ar")}
                      className={`tw-flex tw-items-center tw-w-full tw-px-4 tw-py-2 tw-text-left tw-text-sm ${
                        lang === "ar"
                          ? "tw-bg-gray-100 tw-text-primary tw-font-medium"
                          : "tw-text-gray-700 hover:tw-bg-gray-50"
                      }`}
                    >
                      <span
                        className={`tw-mr-2 ${
                          lang === "ar" ? "tw-opacity-100" : "tw-opacity-0"
                        }`}
                      >
                        ✓
                      </span>
                      العربية
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Section */}
            {user ? (
              <div className="tw-relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!isMenuOpen)}
                  className="tw-flex tw-items-center tw-space-x-2"
                >
                  <div className="tw-h-9 tw-w-9 tw-rounded-full tw-overflow-hidden tw-border-2 tw-border-blue-500">
                    <Image
                      src={user.image || avatar}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="tw-h-full tw-w-full tw-object-cover"
                    />
                  </div>
                  <span className="tw-text-sm tw-font-medium tw-text-gray-700 tw-truncate tw-max-w-[100px]">
                    {user.name || "Account"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-48 tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-z-10">
                    <div className="tw-py-1">
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-100"
                      >
                        <Image
                          src={AccountIcon}
                          alt="Profile"
                          width={16}
                          height={16}
                          className="tw-mr-2"
                        />
                        <FormattedMessage id="home.profile" />
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="tw-flex tw-items-center tw-w-full tw-text-left tw-px-4 tw-py-2 tw-text-sm tw-text-red-600 hover:tw-bg-gray-100"
                      >
                        <svg
                          className="tw-mr-2 tw-h-4 tw-w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <FormattedMessage id="home.Logout" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/signin"
                className="tw-relative tw-flex tw-items-center tw-space-x-2 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-bg-[#2396cc] hover:tw-bg-[#44bcb7] tw-transition-all tw-duration-300 tw-ease-in-out"
              >
                {/* <Image src={LoginIcon} alt="Sign In" width={16} height={16} /> */}
                <span className="tw-text-sm tw-font-medium">
                  <FormattedMessage id="signIn" defaultMessage="SIGN IN" />
                </span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:tw-hidden tw-text-gray-600 focus:tw-outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-menu-toggle
          >
            <Image src={MenuIcon} alt="Menu" width={24} height={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`tw-fixed tw-inset-y-0 tw-right-0 tw-z-50 tw-w-64 tw-bg-white tw-shadow-xl tw-transform tw-transition-transform tw-duration-300 tw-ease-in-out ${
          mobileMenuOpen ? "tw-translate-x-0" : "tw-translate-x-full"
        }`}
      >
        <div className="tw-flex tw-flex-col tw-h-full">
          <div className="tw-p-5 tw-flex tw-justify-between tw-items-center tw-border-b">
            <h2 className="tw-text-lg tw-font-semibold tw-text-gray-800">
              <FormattedMessage id="home.menu" defaultMessage="Offers" />
            </h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="tw-text-gray-500 hover:tw-text-gray-700"
            >
              <Image src={CloseIcon} alt="Close" width={24} height={24} />
            </button>
          </div>

          <nav className="tw-flex-1 tw-px-4 tw-py-6 tw-space-y-6 tw-overflow-y-auto">
            <Link
              href="/offers"
              onClick={() => setMobileMenuOpen(false)}
              className="tw-flex tw-items-center tw-space-x-3 tw-text-gray-700 hover:tw-text-blue-600 tw-transition tw-p-2 tw-rounded-lg hover:tw-bg-gray-50"
            >
              <Image src={DiscountIcon} alt="Offers" width={20} height={20} />
              <span className="tw-text-base tw-font-medium">
                <FormattedMessage id="home.offers" defaultMessage="Offers" />
              </span>
            </Link>

            <Link
              href={user ? "/reservations" : "/signin"}
              onClick={() => setMobileMenuOpen(false)}
              className="tw-flex tw-items-center tw-space-x-3 tw-text-gray-700 hover:tw-text-blue-600 tw-transition tw-p-2 tw-rounded-lg hover:tw-bg-gray-50"
            >
              <Image
                src={ShoppingIcon}
                alt="Reservations"
                width={20}
                height={20}
              />
              <span className="tw-text-base tw-font-medium">
                <FormattedMessage
                  id="home.reservations"
                  defaultMessage="Reservations"
                />
              </span>
            </Link>

            {user ? (
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="tw-flex tw-items-center tw-space-x-3 tw-text-gray-700 hover:tw-text-blue-600 tw-transition tw-p-2 tw-rounded-lg hover:tw-bg-gray-50"
              >
                <Image src={AccountIcon} alt="Profile" width={20} height={20} />
                <span className="tw-text-base tw-font-medium">
                  <FormattedMessage
                    id="home.profile"
                    defaultMessage="Profile"
                  />
                </span>
              </Link>
            ) : (
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="tw-flex tw-items-center tw-space-x-3 tw-text-gray-700 hover:tw-text-blue-600 tw-transition tw-p-2 tw-rounded-lg hover:tw-bg-gray-50"
              >
                <Image src={LoginIcon} alt="Sign In" width={20} height={20} />
                <span className="tw-text-base tw-font-medium">
                  <FormattedMessage id="signIn" defaultMessage="Sign In" />
                </span>
              </Link>
            )}

            {/* Mobile Language Selector */}
            <div className="tw-px-2 tw-py-4 tw-border-t tw-border-gray-200">
              <div className="tw-flex tw-items-center tw-space-x-3 tw-mb-3">
                <Image src={GlobIcon} alt="Language" width={20} height={20} />
                <span className="tw-text-sm tw-text-gray-600">
                  <FormattedMessage
                    id="home.language"
                    defaultMessage="Language"
                  />
                </span>
              </div>
              <div className="tw-flex tw-space-x-2">
                <button
                  onClick={() => toggleLanguage("en")}
                  className={`tw-flex-1 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-rounded-md tw-transition ${
                    lang === "en"
                      ? "tw-bg-blue-100 tw-text-blue-700"
                      : "tw-bg-gray-100 tw-text-gray-700 hover:tw-bg-gray-200"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => toggleLanguage("ar")}
                  className={`tw-flex-1 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-rounded-md tw-transition ${
                    lang === "ar"
                      ? "tw-bg-blue-100 tw-text-blue-700"
                      : "tw-bg-gray-100 tw-text-gray-700 hover:tw-bg-gray-200"
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>
          </nav>

          {user && (
            <div className="tw-p-4 tw-mt-auto tw-border-t tw-border-gray-200">
              <button
                onClick={handleLogout}
                className="tw-flex tw-items-center tw-w-full tw-space-x-3 tw-text-red-600 hover:tw-text-red-700 tw-transition tw-p-2 tw-rounded-lg hover:tw-bg-red-50"
              >
                <svg
                  className="tw-h-5 tw-w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="tw-text-base tw-font-medium">
                  <FormattedMessage id="home.Logout" defaultMessage="Logout" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25 tw-z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
