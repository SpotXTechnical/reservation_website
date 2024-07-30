import React, { useEffect, useReducer, useState } from "react";
import styles from "../../pages/policy/policy.module.css";
import Head from "next/head";
import Loading from "../Loading/Loading";
import { getRefundPolicy } from "../../app/Apis/refundPolicy";

const minDays = 21;
const maxDays = 14;

const initialState = {
  refundPolicyData: null,
  loading: false,
  error: false,
};
const LOADING_STATE = "LOADING_STATE";
const ERROR_STATE = "ERROR_STATE";
const SUCCESS_STATE = "SUCCESS_STATE";
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING_STATE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ERROR_STATE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SUCCESS_STATE:
      return {
        refundPolicyData: action.payload,
        loading: false,
        error: false,
      };

    default:
      return initialState;
  }
};

export default function PolicyContent() {
  const [refundState, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: LOADING_STATE });
    getRefundPolicy()
      .then((response) => {
        const customPolicyObject = {};
        response.map((policy) => {
          customPolicyObject[policy.key] = policy.value;
        });
        console.log(customPolicyObject);
        dispatch({ type: SUCCESS_STATE, payload: { ...customPolicyObject } });
      })
      .catch((error) => {
        dispatch({ type: ERROR_STATE, payload: error.message });
      });
  }, []);
  return (
    <>
      <Head>
        <title>Policy | SpotX</title>
        <meta name="description" content={"SpotX Policy"} />
      </Head>{" "}
      {!refundState.loading && !refundState?.error && (
        <main>
          <div className={styles.policy_container}>
            <h1 className={styles.title}>Cancellation and Refund Policy</h1>
            <section>
              <h2>Cancellation and Refund</h2>
              <ol>
                <li>
                  The tenant can cancel the reservation before the start of the
                  stay under the following conditions:
                  <ul>
                    <li>
                      The cancellation must be officially communicated to the
                      host through the app.
                    </li>
                    <li>
                      Cancellation fees may apply according to the policy
                      specified during the booking process.
                    </li>
                    <li>
                      If the reservation is canceled{" "}
                      {refundState.refundPolicyData?.min_days_before_cancel ||
                        minDays}{" "}
                      days prior to the booking date, the full amount will be
                      refunded.
                    </li>
                    <li>
                      If the reservation is canceled between{" "}
                      {refundState.refundPolicyData?.max_days_before_cancel ||
                        maxDays}{" "}
                      to{" "}
                      {refundState.refundPolicyData?.min_days_before_cancel ||
                        minDays}{" "}
                      days before the reservation date, 50% of the amount paid
                      will be refunded.
                    </li>
                    <li>
                      If the reservation is canceled{" "}
                      {refundState.refundPolicyData?.max_days_before_cancel ||
                        maxDays}{" "}
                      days or less before the booking date, no refund will be
                      issued.
                    </li>
                  </ul>
                </li>
                <li>
                  The cancellation and refund policy may be clearly specified
                  during the booking process, including the allowable
                  cancellation period and applicable fees.
                </li>
              </ol>
            </section>
            <section>
              <h2>Cancellation by the Host</h2>
              <ol>
                <li>
                  The host reserves the right to cancel the reservation in
                  exceptional circumstances, such as unavailability of the
                  accommodation or emergencies.
                </li>
                <li>
                  In case of cancellation by the host, a full refund will be
                  issued to the tenant without any cancellation fees.
                </li>
              </ol>
            </section>
            <section>
              <h2>Communication and Inquiries</h2>
              <ul>
                <li>
                  For any inquiries regarding the cancellation and refund
                  policy, please directly contact the host through the app.{" "}
                </li>
                <li>
                  For disputes or additional inquiries, please contact the
                  customer support team via email at{" "}
                  <a href="mailto:info@spotx.app">info@spotx.app</a>
                </li>
              </ul>
              <p>
                Note: The terms and conditions outlined in the cancellation and
                refund policy apply to all bookings, tenants, and hosts on the
                app.{" "}
              </p>
            </section>
          </div>
          <div className={styles.policy_container} dir="rtl">
            <h1 className={styles.title}>سياسة الإلغاء والاسترداد</h1>
            <section>
              <h2>الإلغاء والاسترداد</h2>
              <ol>
                <li>
                  يمكن للمستأجر إلغاء الحجز قبل بدء الإقامة بموجب الشروط
                  التالية:
                  <ul>
                    <li>يجب إبلاغ المضيف بالإلغاء بشكل رسمي عبر التطبيق.</li>
                    <li>
                      قد يتم تطبيق رسوم إلغاء وفقًا للسياسة المحددة في عملية
                      الحجز.
                    </li>
                    <li>
                      إذا تم إلغاء الحجز قبل{" "}
                      {refundState.refundPolicyData?.min_days_before_cancel ||
                        minDays}{" "}
                      أيام من تاريخ الحجز، يتم استرداد المبلغ المدفوع بالكامل.
                    </li>
                    <li>
                      إذا تم إلغاء الحجز في فترة من{" "}
                      {refundState.refundPolicyData?.max_days_before_cancel ||
                        maxDays}{" "}
                      إلى{" "}
                      {refundState.refundPolicyData?.min_days_before_cancel ||
                        minDays}{" "}
                      أيام قبل تاريخ الحجز، يتم استرداد 50% من المبلغ المدفوع.
                    </li>
                    <li>
                      إذا تم إلغاء الحجز قبل{" "}
                      {refundState.refundPolicyData?.max_days_before_cancel ||
                        maxDays}{" "}
                      أيام أو أقل من تاريخ الحجز، لا يتم استرداد المبلغ المدفوع.
                    </li>
                  </ul>
                </li>
                <li>
                  قد يتم تحديد سياسة الإلغاء والاسترداد بوضوح في عملية الحجز،
                  بما في ذلك الفترة المسموح بها للإلغاء والرسوم المطبقة.
                </li>
              </ol>
            </section>
            <section>
              <h2>الإلغاء بواسطة المضيف</h2>
              <ol>
                <li>
                  يحتفظ المضيف بحق إلغاء الحجز في حالات استثنائية، مثل عدم توافر
                  الإقامة أو ظروف طارئة.
                </li>
                <li>
                  في حالة إلغاء الحجز من قبل المضيف، يتم استرداد المبلغ بالكامل
                  للمستأجر دون خصم أي رسوم إلغاء.
                </li>
              </ol>
            </section>
            <section>
              <h2>التواصل والاستفسارات</h2>
              <ul>
                <li>
                  لأية استفسارات حول سياسة الإلغاء والاسترداد، يرجى التواصل مع
                  المضيف مباشرة عبر التطبيق.
                </li>
                <li>
                  في حالة وجود خلافات أو استفسارات إضافية، يرجى الاتصال بفريق
                  الدعم الفني عبر البريد الإلكتروني{" "}
                  <a href="mailto:info@spotx.app">info@spotx.app</a>
                </li>
              </ul>
              <p>
                ملاحظة: تطبق الشروط والأحكام الواردة في سياسة الإلغاء والاسترداد
                على جميع الحجوزات والمستأجرين والمضيفين في التطبيق.
              </p>
            </section>
          </div>
        </main>
      )}
      {refundState?.loading && <Loading />}
    </>
  );
}
