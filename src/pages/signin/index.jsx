import Input from "../../Components/SharedComponents/Input/Input";
import { useState } from "react";
import styles from "./signin.module.css";
import { FormattedMessage, useIntl } from "react-intl";
import { signIn } from "../../app/Apis/AuthApis";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";

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

  const handleDismissAlret = () => setValidationErrors({});

  const handleSubmit = (e) => {
    e.preventDefault();
    !email && setEmailErr(true);
    !password && setPasswordErr(true);
    if (email && password && !emailErr && !passwordErr) {
      const data = {
        identifier: email,
        password,
      };
      signIn(data).then((res) => {
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
          window.location.href = "/";
        }
      });
    }
  };

  return (
    <>
      {Object.keys(validationErrors).length ? (
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
              <div className="mb-3">
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
                    window.location.href = "/signup";
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
