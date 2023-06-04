import styles from "./profile.module.css";
import { FormattedMessage, useIntl } from "react-intl";
import { getProfile } from "../../app/Apis/HomeApis";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "../../Components/SharedComponents/Input/Input";
import { getCities } from "../../app/Apis/HomeApis";
import { editProfile } from "../../app/Apis/AuthApis";
import { useSelector } from "react-redux";

export default function SignIn() {
  const intl = useIntl();
  const router = useRouter();
  const [data, setData] = useState({});
  const [cityList, setCityList] = useState([]);
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmErr, setPasswordConfirmErr] = useState(false);
  const [city, setCity] = useState("");
  const [cityErr, setCityErr] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleDismissAlret = () => setValidationErrors({});

  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }
  let { lang } = useSelector((state) => state.language);

  useEffect(() => {
    getCities().then((res) => setCityList(res.data));
  }, []);

  useEffect(() => {
    getProfile().then((res) => {
      const { data } = res;
      const { name, email, phone, city, image } = data;
      setData(data);
      setName(name);
      setEmail(email);
      setPhone(phone);
      setCity(city);
      setImagePreview(image);
    });
  }, []);

  function handleFileChange(event) {
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  }

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

  const onCityChange = ({ target }) => {
    const { value } = target;
    setCity(value);
    !value ? setCityErr(true) : setCityErr(false);
  };

  const handleSubmit = () => {
    if (!emailErr && !phoneErr && !cityErr && !passwordErr && !nameErr) {
      // const data = new FormData();
      // file && data.append("image",file);
      // data.append("name",name);
      // data.append("email",email);
      // data.append("city_id",city.id);
      // data.append("password",password);
      // data.append("phone",phone);
      const data = {
        name,
        email,
        city_id: city.id,
        password,
        phone,
      };

      editProfile(data).then((res) => {
        if (res.errors) {
          setValidationErrors(res.errors);
          setTimeout(() => {
            handleDismissAlret();
          }, 5000);
        } else {
          window.location.href = "/profile";
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
      <div className={styles.container}>
        <h2 className={styles.title}>
          <FormattedMessage id="profile.edit.title" />
        </h2>
        {data && (
          <div>
            <div className={styles.edit_profile_head_section}>
              <div>
                <h3>
                  <FormattedMessage id="profile.edit.profilePic" />
                </h3>
                <div className={styles.btns_wrapper}>
                  <button
                    className="cursor_pointer"
                    onClick={() => {
                      window.location.href = "/profile";
                    }}
                  >
                    <FormattedMessage id="cancel" />
                  </button>
                  <button className={styles.save_btn} onClick={handleSubmit}>
                    <FormattedMessage id="save" />
                  </button>
                </div>
              </div>
              <div>
                <div className={styles.file_input_container}>
                  <img
                    className={styles.edit_profile_pic}
                    src={imagePreview ? imagePreview : "/assets/avatar.png"}
                    alt="preview"
                  />

                  <input
                    type="file"
                    id="image-input"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div>
                <h3 className="my-4">
                  <FormattedMessage id="profile.edit.personalData" />
                </h3>
              </div>
              <div className={`row ${styles.input_container}`}>
                <label
                  htmlFor="nameField"
                  className={"form-label col-sm-2 col-md-3"}
                >
                  <FormattedMessage id="profile.edit.fields.name.label" />
                </label>
                <Input
                  type="text"
                  id="nameField"
                  className={`col-sm-9 ${styles.profile_input}`}
                  placeholder={intl.formatMessage({
                    id: "profile.edit.fields.name.placeholder",
                  })}
                  onChange={onNameChange}
                  value={name}
                  error={nameErr && !name ? "requiredField" : ""}
                />
              </div>
              <div className={`row ${styles.input_container}`}>
                <label
                  htmlFor="emailField"
                  className="form-label col-sm-2 col-md-3"
                >
                  <FormattedMessage id="profile.edit.fields.email.label" />
                </label>
                <Input
                  type="email"
                  id="emailField"
                  className={`col-sm-9 ${styles.profile_input}`}
                  placeholder={intl.formatMessage({
                    id: "profile.edit.fields.email.placeholder",
                  })}
                  value={email}
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
              <div className={`row ${styles.input_container}`}>
                <label
                  htmlFor="phoneField"
                  className="form-label col-sm-2 col-md-3"
                >
                  <FormattedMessage id="profile.edit.fields.phone.label" />
                </label>
                <Input
                  type="text"
                  id="phoneField"
                  className={`col-sm-9 ${styles.profile_input}`}
                  placeholder={intl.formatMessage({
                    id: "profile.edit.fields.phone.placeholder",
                  })}
                  value={phone}
                  onChange={onPhoneChange}
                  error={phoneErr && !phone ? "requiredField" : ""}
                />
              </div>
              <div className={`row ${styles.input_container}`}>
                <label
                  htmlFor="cityField"
                  className="form-label col-sm-2 col-md-3"
                >
                  <FormattedMessage id="profile.edit.fields.city.label" />
                </label>
                <select
                  className={`col-sm-9 ${styles.profile_input} form-select`}
                  name="city_id"
                  id="cityField"
                  value={city?.id}
                  onChange={onCityChange}
                >
                  <option value="">
                    <FormattedMessage id="profile.edit.fields.city.placeholder" />
                  </option>
                  {cityList &&
                    cityList.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                </select>
              </div>
              <div className={`row ${styles.input_container}`}>
                <label
                  htmlFor="currPasswordField"
                  className="form-label col-sm-2 col-md-3"
                >
                  <FormattedMessage id="currentPassowrd" />
                </label>
                <Input
                  type="password"
                  id="currPasswordField"
                  className={`${styles.profile_input}`}
                  placeholder={intl.formatMessage({
                    id: "profile.edit.fields.password.placeholder",
                  })}
                  onChange={onPasswordChange}
                  error={passwordErr && !password ? "requiredField" : ""}
                />

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
