import Input from "./SharedComponents/Input/Input";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage, useIntl } from "react-intl";
import { signIn } from "../app/Apis/AuthApis";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import store, { langAction } from "../store";
import styles from "./signin.module.css";

export default function SignIn() {
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }
  const intl = useIntl();
  let { lang } = useSelector((state) => state.language);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const onEmailChange = ({ target }) => {
    setEmail(target.value);
    !target.value ? setEmailErr(true) : setEmailErr(false);
    if (/\S+@\S+\.\S+/.test(target.value) && target.value) {
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
  };

  const onPasswordChange = ({ target }) => {
    const { value } = target;
    setPassword(value);
    !value ? setPasswordErr(true) : setPasswordErr(false);
  };

  const onPhoneChange = ({ target }) => {
    const { value } = target;
    setPhone(value);
    !value ? setPhoneErr(true) : setPhoneErr(false);
  };

  const handleDismissAlret = () => setValidationErrors({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // !email && setEmailErr(true);
    !phone && setPhone(true);
    !password && setPasswordErr(true);
    if (phone && password && !phoneErr && !passwordErr) {
      const data = {
        identifier: phone.startsWith("+2") ? phone : `+2${phone}`,
        password,
      };
      signIn(data)
        .then((res) => {
          if (res.errors) {
            setValidationErrors(res.errors);
            setTimeout(() => {
              handleDismissAlret();
            }, 5000);
          } else {
            localStorage.setItem("user", JSON.stringify(res?.data?.user));
            localStorage.setItem(
              "access_token",
              JSON.stringify(res?.data?.token?.access_token)
            );
            router.push(`/${window.location.search}`);
          }
        })
        .catch((err) => {
          return toast.error(err?.response?.data?.message, { autoClose: 5000 });
        });
    }
  };

  return (
    <>
      {Object.keys(validationErrors).length > 0 ? (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
          style={{ width: "40%", margin: "0 auto" }}
        >
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={handleDismissAlret}
          ></button>
          <ul>
            {Object.entries(validationErrors).map(([k, errors]) => (
              <li key={k}>{errors[0]}</li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
      <div dir={lang === "ar" ? "rtl" : "ltr"} className={styles.container}>
        <ToastContainer />
        <div className={styles.inner_container}>
          <div className={styles.form_container}>
            <h3 className={styles.signin_title}>
              <FormattedMessage id="signin.form.title" />
            </h3>
            <h5 className={styles.welcome_back}>
              <FormattedMessage id="signin.welcomeBack" />
            </h5>
            <p>
              <FormattedMessage id="signin.subtitle" />
            </p>
            <form autoComplete="off">
              {/* <div className="mb-3">
                <label htmlFor="emailField" className={styles.label}>
                  <FormattedMessage id="signin.fields.email.label" />
                </label>
                <Input
                  type="email"
                  id="emailField"
                  className={styles.signin_input}
                  placeholder={intl.formatMessage({
                    id: "signin.fields.email.placeholder",
                  })}
                  onChange={onEmailChange}
                  error={
                    emailErr && !email
                      ? "requiredField"
                      : emailErr && email
                      ? "invalidEmail"
                      : ""
                  }
                />
              </div> */}
              <div className="mb-3">
                <label htmlFor="phoneField" className={styles.label}>
                  <FormattedMessage id="signup.fields.phone.label" />
                </label>
                <Input
                  type="text"
                  id="phoneField"
                  className={styles.signin_input}
                  placeholder={intl.formatMessage({
                    id: "signup.fields.phone.placeholder",
                  })}
                  onChange={onPhoneChange}
                  error={phoneErr && !phone ? "requiredField" : ""}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordField" className={styles.label}>
                  <FormattedMessage id="signin.fields.password.label" />
                </label>
                <Input
                  type="password"
                  id="passwordField"
                  className={styles.signin_input}
                  placeholder={intl.formatMessage({
                    id: "signin.fields.password.placeholder",
                  })}
                  onChange={onPasswordChange}
                  error={passwordErr && !password ? "requiredField" : ""}
                />
              </div>
              <button
                type="submit"
                className={`${styles.button_wrapper}`}
                onClick={handleSubmit}
              >
                <FormattedMessage id="signin.form.title" />
              </button>
            </form>
            <div className={styles.dont_have_account}>
              <span>
                <FormattedMessage id="signin.dontHaveAcc" />{" "}
                <span
                  className={styles.signUp}
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  <FormattedMessage id="signin.signup" />
                </span>
              </span>
            </div>
          </div>
          <div className={styles.image_container}>
            <img
              className={styles.main_img}
              src="/assets/signIn.png"
              alt="signin"
            />
          </div>
        </div>
      </div>
    </>
  );
}
