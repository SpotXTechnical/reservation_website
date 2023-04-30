import styles from "./profile.module.css";
import { FormattedMessage, useIntl } from "react-intl";
import { getProfile } from "@/app/Apis/AuthApis";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "@/Components/SharedComponents/Input/Input";
import { getCities } from "@/app/Apis/HomeApis";

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

  useEffect(() => {
    getCities().then((res) => setCityList(res.data));
  }, []);

  useEffect(() => {
    getProfile().then((res) => {
      setData(res.data);
    });
  }, []);

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

  return (
    <>
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
                <div>
                  <button>
                    <FormattedMessage id="cancel" />
                  </button>
                  <button>
                    <FormattedMessage id="save" />
                  </button>
                </div>
              </div>
              <div>
                <img
                  className={styles.edit_profile_pic}
                  src={data.image ? data.image : "/assets/signIn.png"}
                  alt="signin"
                />
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
                  className="form-label text-grey col-sm-2 col-md-3"
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
                  value={data.name}
                  error={nameErr && !name ? "requiredField" : ""}
                />
              </div>
              <div className={`row ${styles.input_container}`}>
                <label
                  htmlFor="emailField"
                  className="form-label text-grey col-sm-2 col-md-3"
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
                  value={data.email}
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
                  className="form-label text-grey col-sm-2 col-md-3"
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
                  value={data.phone}
                  onChange={onPhoneChange}
                  error={phoneErr && !phone ? "requiredField" : ""}
                />
              </div>
              <div className={`row ${styles.input_container}`}>
                <label
                  htmlFor="cityField"
                  className="form-label text-grey col-sm-2 col-md-3"
                >
                  <FormattedMessage id="profile.edit.fields.city.label" />
                </label>
                <select
                  className={`col-sm-9 ${styles.profile_input} form-select`}
                  name="city_id"
                  id="cityField"
                  defaultValue={data.city}
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
                  className="form-label text-grey col-sm-2 col-md-3"
                >
                  <FormattedMessage id="currentPassowrd" />
                </label>
                <div className="col-sm-9">
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
                  {/* <span><FormattedMessage id="changePassowrd"/></span> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
