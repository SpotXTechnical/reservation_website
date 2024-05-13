import React, { useRef, useState } from "react";
import styles from "./OTP.module.css";
export default function OTP({ isLoading, onConfirmCode }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const otpBoxReference = useRef([]);
  function handleChange(value, index) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < 6 - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }
  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < 6 - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleCodeSubmit() {
    if (otp.join("") !== "") {
      onConfirmCode(otp.join(""));
    }
  }
  return (
    <article className="container p-2">
      <div className="d-flex justify-content-center align-items-center width-100 row mx-auto">
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className={`border fs-3 col-2 h-auto text-white py-1 px-2 rounded flex-1 d-block bg-black focus-ring text-center  outline-none`}
          />
        ))}
      </div>
      <button
        className={`btn mt-3 d-block mx-auto  ${styles.CTA_confirm}`}
        onClick={handleCodeSubmit}
      >
        {isLoading ? (
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Confirm"
        )}
      </button>
    </article>
  );
}
