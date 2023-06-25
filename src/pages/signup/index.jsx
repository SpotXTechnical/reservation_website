import Input from "../../Components/SharedComponents/Input/Input";
import { useEffect, useState } from "react";
import styles from "./signup.module.css";
import { FormattedMessage, useIntl } from "react-intl";
import { getCities } from "../../app/Apis/HomeApis";
import { signUp } from "../../app/Apis/AuthApis";
import { useRouter } from "next/router";
import store, { langAction } from "../../store";
import { useSelector } from "react-redux";

export default function SignUp() {
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }
  let { lang } = useSelector((state) => state.language);
  const intl = useIntl();
  const router = useRouter();
  const [cityList, setCityList] = useState([]);
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState(false);
  // const [showNewPass, setShowNewPass] = useState(false);
  // const [showRepPass, setShowRepPass] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmErr, setPasswordConfirmErr] = useState(false);
  const [city, setCity] = useState("");
  const [cityErr, setCityErr] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    getCities().then((res) => setCityList(res.data));
  }, [lang]);

  const onNameChange = ({ target }) => {
    const { value } = target;
    setName(value);
    !value ? setNameErr(true) : setNameErr(false);
  };
  const onEmailChange = ({ target }) => {
    setEmail(target.value);
    !target.value ? setEmailErr(true) : setEmailErr(false);
    if (/\S+@\S+\.\S+/.test(target.value) && target.value) {
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
  };
  const onPhoneChange = ({ target }) => {
    const { value } = target;
    setPhone(value);
    !value ? setPhoneErr(true) : setPhoneErr(false);
  };
  const onPasswordChange = ({ target }) => {
    const { value } = target;
    setPassword(value);
    !value ? setPasswordErr(true) : setPasswordErr(false);
  };
  const onPasswordConfirmChange = ({ target }) => {
    const { value } = target;
    setPasswordConfirm(value);
    !value ? setPasswordConfirmErr(true) : setPasswordConfirmErr(false);
    if (value && value === password) {
      setPasswordConfirmErr(false);
    } else {
      setPasswordConfirmErr(true);
    }
  };
  const onCityChange = ({ target }) => {
    const { value } = target;
    setCity(value);
    !value ? setCityErr(true) : setCityErr(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    !name && setNameErr(true);
    !email && setEmailErr(true);
    !phone && setPhoneErr(true);
    // !city && setCityErr(true);
    !password && setPasswordErr(true);
    !passwordConfirm && setPasswordConfirmErr(true);
    if (
      name &&
      email &&
      phone &&
      password &&
      passwordConfirm &&
      !nameErr &&
      !emailErr &&
      !phoneErr &&
      !passwordErr &&
      !passwordConfirmErr
    ) {
      const data = {
        name,
        email,
        phone,
        password,
        password_confirmation: passwordConfirm,
        // city_id: city,
      };
      console.log(data);
      signUp(data).then((res) => {
        if (res.errors) {
          setValidationErrors(res.errors);
          setTimeout(() => {
            setValidationErrors({});
          }, 5000);
        } else {
          localStorage.setItem("user", JSON.stringify(res?.data?.user));
          localStorage.setItem(
            "access_token",
            JSON.stringify(res?.data?.token?.access_token)
          );
          // router.push('/')
          window.location.href = "/";
        }
        console.log(res);
      });
    }
  };

  return (
    <>
      <div dir={lang === "ar" ? "rtl" : "ltr"} className={styles.container}>
        {Object.keys(validationErrors).length > 0 ? (
          <div class="alert alert-danger" role="alert">
            <ul>
              {Object.entries(validationErrors).map(([k, errors], i) => (
                <li key={i}>{errors[0]}</li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
        <h3 className={styles.title}>
          <FormattedMessage id="signup.form.title" />
        </h3>
        <form autoComplete="off">
          <div className="mb-3">
            <label htmlFor="nameField" className={styles.label}>
              <FormattedMessage id="signup.fields.name.label" />
            </label>
            <Input
              type="text"
              id="nameField"
              className={styles.signup_input}
              placeholder={intl.formatMessage({
                id: "signup.fields.name.placeholder",
              })}
              onChange={onNameChange}
              error={nameErr && !name ? "requiredField" : ""}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailField" className={styles.label}>
              <FormattedMessage id="signup.fields.email.label" />
            </label>
            <Input
              type="email"
              id="emailField"
              className={styles.signup_input}
              placeholder={intl.formatMessage({
                id: "signup.fields.email.placeholder",
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
              <FormattedMessage id="signup.fields.password.label" />
            </label>
            <Input
              type="password"
              id="passwordField"
              className={styles.signup_input}
              placeholder={intl.formatMessage({
                id: "signup.fields.password.placeholder",
              })}
              onChange={onPasswordChange}
              error={passwordErr && !password ? "requiredField" : ""}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPasswordField" className={styles.label}>
              <FormattedMessage id="signup.fields.confirmPassword.label" />
            </label>
            <Input
              type="password"
              id="confirmPasswordField"
              className={styles.signup_input}
              placeholder={intl.formatMessage({
                id: "signup.fields.confirmPassword.placeholder",
              })}
              onChange={onPasswordConfirmChange}
              error={
                passwordConfirmErr && !passwordConfirm
                  ? "requiredField"
                  : passwordConfirmErr && passwordConfirm
                  ? "invalidPassword"
                  : ""
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneField" className={styles.label}>
              <FormattedMessage id="signup.fields.phone.label" />
            </label>
            <Input
              type="text"
              id="phoneField"
              className={styles.signup_input}
              placeholder={intl.formatMessage({
                id: "signup.fields.phone.placeholder",
              })}
              onChange={onPhoneChange}
              error={phoneErr && !phone ? "requiredField" : ""}
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="cityField" className={styles.label}>
              <FormattedMessage id="signup.fields.city.label" />
            </label>
            <select
              className={`${styles.signup_input} form-select`}
              name="city_id"
              id="cityField"
              defaultValue={city}
              onChange={onCityChange}
            >
              <option value="">
                <FormattedMessage id="signup.fields.city.placeholder" />
              </option>
              {cityList &&
                cityList.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </select>
          </div> */}
          <button
            type="submit"
            className={`${styles.button_wrapper}`}
            onClick={handleSubmit}
          >
            <FormattedMessage id="signup.form.title" />
          </button>
        </form>
        <div className={styles.already_have_account}>
          <span>
            <FormattedMessage id="signup.haveAcc" />{" "}
            <span
              className={styles.signIn}
              onClick={() => {
                window.location.href = "/signin";
              }}
            >
              <FormattedMessage id="signup.signin" />
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
