import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "../../pages/policy/policy.module.css";
import Head from "next/head";

export default function PolicyContent() {
  return (
    <>
      <Head>
        <title>Policy | SpotX</title>
        <meta name="description" content={"SpotX Policy"} />
      </Head>{" "}
      <div className={styles.policy_container}>
        <h1 className={styles.title}>Cancellation and Refund Policy</h1>
        <section>
          <h2>Cancellation and Refund</h2>
          <ol>
            <li>
              The tenant can cancel the reservation before the start of the stay
              under the following conditions:
              <ul>
                <li>
                  The cancellation must be officially communicated to the host
                  through the app.
                </li>
                <li>
                  Cancellation fees may apply according to the policy specified
                  during the booking process.
                </li>
                <li>
                  If the reservation is canceled 7 days prior to the booking
                  date, the full amount will be refunded.
                </li>
                <li>
                  If the reservation is canceled 4 days prior to the booking
                  date, a 50% cancellation fee will be deducted.
                </li>
                <li>
                  If the reservation is canceled 2 days or less before the
                  booking date, no refund will be issued.
                </li>
              </ul>
            </li>
            <li>
              The cancellation and refund policy may be clearly specified during
              the booking process, including the allowable cancellation period
              and applicable fees.
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
              In case of cancellation by the host, a full refund will be issued
              to the tenant without any cancellation fees.
            </li>
          </ol>
        </section>
        <section>
          <h2>Communication and Inquiries</h2>
          <ul>
            <li>
              For any inquiries regarding the cancellation and refund policy,
              please directly contact the host through the app.{" "}
            </li>
            <li>
              For disputes or additional inquiries, please contact the customer
              support team via email at{" "}
              <a href="mailto:info@spotx.app">info@spotx.app</a>
            </li>
          </ul>
          <p>
            Note: The terms and conditions outlined in the cancellation and
            refund policy apply to all bookings, tenants, and hosts on the app.{" "}
          </p>
        </section>
      </div>
      <div className={styles.policy_container} dir="rtl">
        <h1 className={styles.title}>سياسة الإلغاء والاسترداد</h1>
        <section>
          <h2>الإلغاء والاسترداد</h2>
          <ol>
            <li>
              يمكن للمستأجر إلغاء الحجز قبل بدء الإقامة بموجب الشروط التالية:
              <ul>
                <li>يجب إبلاغ المضيف بالإلغاء بشكل رسمي عبر التطبيق.</li>
                <li>
                  قد يتم تطبيق رسوم إلغاء وفقًا للسياسة المحددة في عملية الحجز.
                </li>
                <li>
                  إذا تم إلغاء الحجز قبل 7 أيام من تاريخ الحجز، يتم استرداد
                  المبلغ المدفوع بالكامل.
                </li>
                <li>
                  إذا تم إلغاء الحجز قبل 4 أيام من تاريخ الحجز، يتم خصم 50% من
                  المبلغ المدفوع كرسوم إلغاء.
                </li>
                <li>
                  إذا تم إلغاء الحجز قبل 2 أيام أو أقل من تاريخ الحجز، لا يتم
                  استرداد المبلغ المدفوع.
                </li>
              </ul>
            </li>
            <li>
              قد يتم تحديد سياسة الإلغاء والاسترداد بوضوح في عملية الحجز، بما في
              ذلك الفترة المسموح بها للإلغاء والرسوم المطبقة.
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
              في حالة وجود خلافات أو استفسارات إضافية، يرجى الاتصال بفريق الدعم
              الفني عبر البريد الإلكتروني{" "}
              <a href="mailto:info@spotx.app">info@spotx.app</a>
            </li>
          </ul>
          <p>
            ملاحظة: تطبق الشروط والأحكام الواردة في سياسة الإلغاء والاسترداد على
            جميع الحجوزات والمستأجرين والمضيفين في التطبيق.
          </p>
        </section>
      </div>
    </>
  );
}
