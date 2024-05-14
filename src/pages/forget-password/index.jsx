import React, { useReducer, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./forgetPassword.module.css";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../app/Apis/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../Components/Modal/Modal";
import OTP from "../../Components/OTP/OTP";
import { useRouter } from "next/router";
const initialState = {
  userSentOTPLoading: false,
  otpCodeSent: false,
  userPhoneNumber: "",
};
const OTP_CODE_SENT = "OTP_CODE_SENT";
const OTP_SENT_LOADING = "OTP_SENT_LOADING";
const CLOSE_OTP_MODAL = "CLOSE_OTP_MODAL";
const SET_PHONE_NUMBER = "SET_PHONE_NUMBER";
const reducer = (state, action) => {
  switch (action.type) {
    case OTP_CODE_SENT:
      return {
        ...state,
        otpCodeSent: true,
      };
    case OTP_SENT_LOADING:
      return {
        ...state,
        userSentOTPLoading: true,
      };
    case CLOSE_OTP_MODAL:
      return {
        ...state,
        otpCodeSent: false,
      };
    case SET_PHONE_NUMBER:
      localStorage.setItem("userPhoneNumber", action.payload);
      return {
        ...state,
        userPhoneNumber: action.payload,
      };
    default:
      return initialState;
  }
};
export default function ForgetPassword() {
  const verificationBtn = useRef();
  const [otpState, dispatch] = useReducer(reducer, initialState);
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch({ type: SET_PHONE_NUMBER, payload: data.phoneNumber });
    const { phoneNumber } = data;
    let appVerifier;
    if (!appVerifier) {
      appVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
    signInWithPhoneNumber(auth, `+2${phoneNumber}`, appVerifier)
      .then(async (confirmationResult) => {
        toast.success("Confirmation code sent");
        dispatch({ type: OTP_CODE_SENT });
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        toast.error("Something went wrong", {
          autoClose: 5000,
          position: "top-right",
        });
      });
  };

  const checkVerification = (code) => {
    window.confirmationResult
      .confirm(code)
      .then((res) => {
        router.push("/reset-password");
      })
      .catch((error) => {
        toast.error("bad verification code", {
          autoClose: 5000,
          position: "top-right",
        });
      });
  };

  const handleCode = (code) => {
    dispatch({ type: CLOSE_OTP_MODAL });
    setVerificationCode(code);
    checkVerification(code);
  };

  return (
    <main className="p-2 text-center mb-3">
      <ToastContainer />
      <h1 className="fw-bold pt-4 pb-2 fs-3 fs-md-4">Forget Your Password?</h1>
      <section className=" mx-auto">
        <form
          className="bg-white shadow rounded col-12 col-md-6 mx-auto p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-3 d-flex flex-column gap-2 align-items-center col-12">
            <label className="fw-bold fs-4 col-12" style={{ color: "#44bcb7" }}>
              Please enter your phone number
            </label>
            <input
              type="tel"
              className="d-block border rounded col-12 col-md-6 py-2 px-2 col-8 "
              autoFocus
              {...register("phoneNumber", {
                required: true,
                pattern: /^01([0-2]|5)\d{1,8}$/,
              })}
            />
            {errors.phoneNumber?.type === "required" && (
              <p className={`${styles.error} mb-1`}>Phone number is required</p>
            )}
            {errors.phoneNumber?.type === "pattern" && (
              <p className={`${styles.error} mb-1`}>
                Please enter a valid phone number
              </p>
            )}
            <div id="recaptcha-container"></div>
            <button
              type="submit"
              ref={verificationBtn}
              className={`btn ${styles.verificationBtn}`}
            >
              Send verification code
            </button>
          </div>
        </form>
        <Modal
          isOpen={otpState.otpCodeSent}
          toggleModal={() => dispatch({ type: CLOSE_OTP_MODAL })}
          className={"modal_body"}
          modalBody={
            <OTP
              isLoading={otpState.userSentOTPLoading}
              onConfirmCode={handleCode}
            />
          }
        />
      </section>
    </main>
  );
}
