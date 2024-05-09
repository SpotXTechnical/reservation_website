import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ResetPassword.module.css";
import { resetPassword } from "../../app/Apis/ResetPassword";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
export async function getServerSideProps(context) {
  const url = context.req.headers.referer;
  if (!url && !url?.includes("/forget-password")) {
    return {
      redirect: {
        destination: "/forget-password",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default function ResetPassword() {
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userData = new FormData();
    userData.append("phone", data.phoneNumber);
    userData.append("password", data.password);
    userData.append("password_confirmation", data.confirmPass);
    try {
      const response = await resetPassword(userData);
      setIsPasswordReset((prev) => !prev);
    } catch (error) {
      toast.error(`${error.message}`, {
        autoClose: 5000,
        position: "top-right",
      });
    }
  };
  return (
    <main className="p-3 text-center mb-3">
      <ToastContainer />

      {!isPasswordReset && (
        <section className=" mx-auto">
          <form
            className="bg-white shadow rounded col-12 col-md-8 mx-auto p-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="p-3 d-flex flex-column align-items-center gap-2  col-12">
              <label
                className="fw-bold  fs-6 col-12"
                style={{ color: "#44bcb7" }}
                htmlFor="phone"
              >
                Please enter your phone number
              </label>
              <input
                id="phone"
                type="tel"
                className="d-block border rounded focus-ring col-12 col-md-8 py-2 px-2"
                autoFocus
                {...register("phoneNumber", {
                  required: true,
                  pattern: /^01([0-2]|5)\d{1,8}$/,
                })}
              />
              {errors.phoneNumber?.type === "required" && (
                <p className={`${styles.error} mb-1 `}>
                  Phone number is required
                </p>
              )}
              {errors.phoneNumber?.type === "pattern" && (
                <p className={`${styles.error} mb-1`}>
                  Please enter a valid phone number
                </p>
              )}
              <label
                className="fw-bold  fs-6 col-12"
                style={{ color: "#44bcb7" }}
                htmlFor="password"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                className="d-block border rounded focus-ring col-12 col-md-8 py-2 px-2"
                autoFocus
                {...register("password", {
                  required: true,
                  pattern: /.{6,}/,
                })}
              />
              {errors.password?.type === "required" && (
                <p className={`${styles.error} mb-1 `}>Password is required</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className={`${styles.error} mb-1 `}>
                  Password must be at least 6 characters
                </p>
              )}
              <label
                className="fw-bold  fs-6 col-12"
                style={{ color: "#44bcb7" }}
                htmlFor="confirm_password"
              >
                Confirm Password
              </label>
              <input
                id="confirm_password"
                type="password"
                className="d-block border rounded focus-ring col-12 col-md-8 py-2 px-2"
                autoFocus
                {...register("confirmPass", {
                  required: true,
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />
              {errors.confirmPass?.type === "required" && (
                <p className={`${styles.error} mb-1 `}>
                  Confirm password is required
                </p>
              )}
              {errors.confirmPass && (
                <p className={`${styles.error} mb-1 `}>
                  {errors.confirmPass.message}
                </p>
              )}
            </div>

            <button type="submit" className={`btn ${styles.Reset_Btn}`}>
              Reset
            </button>
          </form>
        </section>
      )}
      {isPasswordReset && (
        <section className=" mx-auto">
          <div className="bg-white shadow rounded col-12 col-md-8 mx-auto p-3">
            <p className={styles.success}> Password reset successfully!</p>
            <Link href="/signin" className={styles.sign_in}>
              Sign In?
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
