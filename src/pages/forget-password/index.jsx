import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import styles from "./forgetPassword.module.css";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../app/Apis/firebaseConfig";

export default function ForgetPassword() {
  const verificationBtn = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { phoneNumber } = data;
    const appVerifier = new RecaptchaVerifier("recaptcha-container", {}, auth);
    signInWithPhoneNumber(auth, `+2${phoneNumber}`, appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
      })
      .catch((error) => {
        console.log(error);
      });

    // signInWithPhoneNumber(auth, `+2${phoneNumber}`);
  };

  return (
    <main className="p-2 text-center mb-3">
      <h1 className="fw-bold pt-4 pb-2 fs-3 fs-md-4">Forget Your Password?</h1>
      <section className=" mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <form className="bg-white shadow rounded col-12 col-md-6 mx-auto p-2">
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
                pattern: /^01[0-2]\d{1,8}$/,
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
      </section>
    </main>
  );
}
