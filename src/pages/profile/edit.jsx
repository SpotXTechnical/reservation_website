import { FormattedMessage, useIntl } from "react-intl";
import { getProfile } from "../../app/Apis/AuthApis";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import store, { langAction } from "../../store";
import Input from "../../Components/SharedComponents/Input/Input";
import { getCities } from "../../app/Apis/HomeApis";
import { editProfile } from "../../app/Apis/AuthApis";
import { useSelector } from "react-redux";
import Head from "next/head";

export default function EditProfile() {
  const intl = useIntl();
  const router = useRouter();
  const [data, setData] = useState(null);
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
          router.push(`/profile`);
        }
      });
    }
  };

  return (
    <>
      <Head>
        <title>Your Profile | SpotX</title>
        <meta name="description" content={"user Profile in SpotX"} />
      </Head>

      <div className="tw-min-h-screen tw-bg-gray-50 tw-py-6 tw-px-4 sm:tw-px-6 lg:tw-px-8">
        <div className="tw-max-w-4xl tw-mx-auto">
          {/* Validation Errors Alert */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-lg tw-p-4 tw-mb-6 tw-relative">
              <button
                type="button"
                className="tw-absolute tw-top-3 tw-right-3 tw-text-red-400 hover:tw-text-red-600 tw-transition-colors"
                onClick={handleDismissAlret}
                aria-label="Close"
              >
                <svg
                  className="tw-w-5 tw-h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="tw-pr-8">
                <h3 className="tw-text-sm tw-font-medium tw-text-red-800 tw-mb-2">
                  Please fix the following errors:
                </h3>
                <ul className="tw-list-disc tw-list-inside tw-text-sm tw-text-red-700">
                  {Object.entries(validationErrors).map(([k, errors]) => (
                    <li key={k}>{errors[0]}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Page Header */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-mb-8">
            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-start sm:tw-items-center tw-justify-between tw-gap-4">
              <h2 className="tw-text-2xl sm:tw-text-3xl tw-font-bold tw-text-gray-900">
                <FormattedMessage id="profile.edit.title" />
              </h2>
              <div className="tw-flex tw-gap-3">
                <button
                  className="tw-px-4 tw-py-2 tw-text-gray-600 tw-border tw-border-gray-300 tw-rounded-lg hover:tw-bg-gray-50 tw-transition-colors tw-duration-200"
                  onClick={() => router.push("/profile")}
                >
                  <FormattedMessage id="cancel" />
                </button>
                <button
                  className="tw-px-6 tw-py-2 tw-text-white tw-rounded-lg tw-font-medium tw-shadow-md hover:tw-shadow-lg tw-transition-all tw-duration-200"
                  style={{ backgroundColor: "#44bcb7" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#3aa8a3")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#44bcb7")
                  }
                  onClick={handleSubmit}
                >
                  <FormattedMessage id="save" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {!data && (
            <div className="tw-space-y-8">
              {/* Header Skeleton */}
              <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6">
                <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-start sm:tw-items-center tw-justify-between tw-gap-4">
                  <div className="tw-h-8 tw-bg-gray-200 tw-rounded-md tw-w-48 tw-animate-pulse"></div>
                  <div className="tw-flex tw-gap-3">
                    <div className="tw-h-10 tw-bg-gray-200 tw-rounded-lg tw-w-20 tw-animate-pulse"></div>
                    <div className="tw-h-10 tw-bg-gray-200 tw-rounded-lg tw-w-16 tw-animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Profile Picture Skeleton */}
              <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6">
                <div className="tw-h-6 tw-bg-gray-200 tw-rounded-md tw-w-32 tw-mb-6 tw-animate-pulse"></div>
                <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-6">
                  <div className="tw-w-24 tw-h-24 sm:tw-w-32 sm:tw-h-32 tw-bg-gray-200 tw-rounded-full tw-animate-pulse"></div>
                  <div className="tw-text-center sm:tw-text-left">
                    <div className="tw-h-10 tw-bg-gray-200 tw-rounded-lg tw-w-32 tw-animate-pulse tw-mb-2"></div>
                    <div className="tw-h-4 tw-bg-gray-200 tw-rounded tw-w-24 tw-animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Form Skeleton */}
              <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6">
                <div className="tw-h-6 tw-bg-gray-200 tw-rounded-md tw-w-40 tw-mb-6 tw-animate-pulse"></div>
                <div className="tw-space-y-6">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-4 tw-gap-4 tw-items-start"
                    >
                      <div className="tw-h-5 tw-bg-gray-200 tw-rounded tw-w-20 tw-animate-pulse sm:tw-mt-2"></div>
                      <div className="sm:tw-col-span-3">
                        <div className="tw-h-10 tw-bg-gray-200 tw-rounded-lg tw-w-full tw-animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {data && (
            <>
              {/* Profile Picture Section */}
              <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-mb-8">
                <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-6">
                  <FormattedMessage id="profile.edit.profilePic" />
                </h3>

                <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-6">
                  <div className="tw-relative tw-group">
                    <img
                      className="tw-w-24 tw-h-24 sm:tw-w-32 sm:tw-h-32 tw-rounded-full tw-object-cover tw-border-4 tw-shadow-md"
                      style={{ borderColor: "#44bcb7" }}
                      src={imagePreview ? imagePreview : "/assets/avatar.png"}
                      alt="preview"
                    />
                    <div className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-40 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-200">
                      <svg
                        className="tw-w-8 tw-h-8 tw-text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="tw-text-center sm:tw-text-left">
                    <label
                      htmlFor="image-input"
                      className="tw-cursor-pointer tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50 tw-transition-colors tw-duration-200"
                    >
                      <svg
                        className="tw-w-4 tw-h-4 tw-mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Upload Photo
                    </label>
                    <input
                      type="file"
                      id="image-input"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="tw-hidden"
                    />
                    <p className="tw-text-xs tw-text-gray-500 tw-mt-2">
                      JPG, PNG up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Data Section */}
              <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6">
                <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-6">
                  <FormattedMessage id="profile.edit.personalData" />
                </h3>

                <div className="tw-space-y-6">
                  {/* Name Field */}
                  <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-4 tw-gap-4 tw-items-start">
                    <label
                      htmlFor="nameField"
                      className="tw-text-sm tw-font-medium tw-text-gray-700 sm:tw-pt-2"
                    >
                      <FormattedMessage id="profile.edit.fields.name.label" />
                    </label>
                    <div className="sm:tw-col-span-3">
                      <Input
                        type="text"
                        id="nameField"
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-border-transparent tw-transition-all tw-duration-200"
                        style={{ "--tw-ring-color": "#44bcb7" }}
                        placeholder={intl.formatMessage({
                          id: "profile.edit.fields.name.placeholder",
                        })}
                        onChange={onNameChange}
                        value={name}
                        error={nameErr && !name ? "requiredField" : ""}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-4 tw-gap-4 tw-items-start">
                    <label
                      htmlFor="emailField"
                      className="tw-text-sm tw-font-medium tw-text-gray-700 sm:tw-pt-2"
                    >
                      <FormattedMessage id="profile.edit.fields.email.label" />
                    </label>
                    <div className="sm:tw-col-span-3">
                      <Input
                        type="email"
                        id="emailField"
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-border-transparent tw-transition-all tw-duration-200"
                        style={{ "--tw-ring-color": "#44bcb7" }}
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
                  </div>

                  {/* Phone Field */}
                  <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-4 tw-gap-4 tw-items-start">
                    <label
                      htmlFor="phoneField"
                      className="tw-text-sm tw-font-medium tw-text-gray-700 sm:tw-pt-2"
                    >
                      <FormattedMessage id="profile.edit.fields.phone.label" />
                    </label>
                    <div className="sm:tw-col-span-3">
                      <Input
                        type="text"
                        id="phoneField"
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-border-transparent tw-transition-all tw-duration-200"
                        style={{ "--tw-ring-color": "#44bcb7" }}
                        placeholder={intl.formatMessage({
                          id: "profile.edit.fields.phone.placeholder",
                        })}
                        value={phone}
                        onChange={onPhoneChange}
                        error={phoneErr && !phone ? "requiredField" : ""}
                      />
                    </div>
                  </div>

                  {/* City Field */}
                  <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-4 tw-gap-4 tw-items-start">
                    <label
                      htmlFor="cityField"
                      className="tw-text-sm tw-font-medium tw-text-gray-700 sm:tw-pt-2"
                    >
                      <FormattedMessage id="profile.edit.fields.city.label" />
                    </label>
                    <div className="sm:tw-col-span-3">
                      <select
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-border-transparent tw-transition-all tw-duration-200 tw-bg-white"
                        style={{ "--tw-ring-color": "#44bcb7" }}
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
                  </div>

                  {/* Password Field */}
                  <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-4 tw-gap-4 tw-items-start">
                    <label
                      htmlFor="currPasswordField"
                      className="tw-text-sm tw-font-medium tw-text-gray-700 sm:tw-pt-2"
                    >
                      <FormattedMessage id="currentPassowrd" />
                    </label>
                    <div className="sm:tw-col-span-3">
                      <Input
                        type="password"
                        id="currPasswordField"
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-ring-2 focus:tw-border-transparent tw-transition-all tw-duration-200"
                        style={{ "--tw-ring-color": "#44bcb7" }}
                        placeholder={intl.formatMessage({
                          id: "profile.edit.fields.password.placeholder",
                        })}
                        onChange={onPasswordChange}
                        error={passwordErr && !password ? "requiredField" : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
