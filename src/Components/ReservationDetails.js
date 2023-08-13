import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import store, { langAction } from "../store";
import {
  cancelReservation,
  getReservationDetails,
} from "../app/Apis/ReservationApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "react-responsive-carousel";
import { ShimmerThumbnail } from "react-shimmer-effects";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import styles from "./reservations.module.css";

export default function SubRegion() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  let { lang } = useSelector((state) => state.language);
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }

  const handleCancelReservation = (id) => {
    cancelReservation(id).then((res) => {
      res &&
        toast.success(
          lang === "ar" ? "تم الغاء الحجز" : "Reservation is cancelled",
          { autoClose: 5000 }
        );
      router.push("/reservations");
    });
  };

  useEffect(
    function () {
      if (id) {
        getReservationDetails(id).then((res) => {
          setData(res.data);
        });
      }
    },
    [id, lang]
  );

  const handleClick = () => {
    router.push(`/properties/${data?.unit?.id}`);
  };

  return (
    <div
      className={styles.reservation_details}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {data?.unit?.images ? (
        <div className={`flex-center ${styles.head}`}>
          <Carousel showThumbs={false} showStatus={false} emulateTouch={true}>
            {data?.unit?.images?.map((slide) => (
              <div key={slide.id}>
                <div
                  className={styles.carousel_img}
                  style={{ backgroundImage: `url(${slide.url}` }}
                ></div>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <ShimmerThumbnail height={500} rounded />
      )}
      <div className={styles.details_wrapper}>
        <div className={styles.view_details_wrapper}>
          <div className={styles.statuses_wrapper}>
            <p className={`align-self-end ${styles.status} ${data.status}`}>
              {data.status}
            </p>
            {data.status === "pending" && (
              <button onClick={() => handleCancelReservation(data.id)}>
                <FormattedMessage id="cancel reservation" />
              </button>
            )}
          </div>
          <p onClick={handleClick} className={styles.view_details}>
            <FormattedMessage id="viewDetais" />
          </p>
        </div>
        <div className={styles.summary_container}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex gap-2">
              <img
                src="/assets/calendar.png"
                alt="calendar"
                width="20"
                height="20"
              />
              <p className={styles.reservation_date}>
                <FormattedMessage id="Reservation_date" />{" "}
              </p>
            </div>
            <div className={styles.nights}>
              {data?.days} <FormattedMessage id="nights" />
            </div>
          </div>
          <div className={styles.from_to_wrapper}>
            <p>
              <span className={styles.label}>
                <FormattedMessage id="from" />
              </span>
              <span className={styles.date}>
                {moment(data?.from).format("ddd, DD MMM")}
              </span>
            </p>
            <p>
              <span className={styles.label}>
                <FormattedMessage id="to" />
              </span>
              <span className={styles.date}>
                {moment(data?.to).format("ddd, DD MMM")}
              </span>
            </p>
          </div>
          <hr className={styles.total_price_hr} />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex gap-2">
              <img src="/assets/money.png" alt="money" width="30" height="20" />
              <p className={styles.reservation_date}>
                <FormattedMessage id="total_cost" />{" "}
              </p>
            </div>
            <div className={styles.total_money}>
              {data?.total_price} {" LE"}
            </div>
          </div>
        </div>
        {data?.unit?.owner?.name ? (
          <div className={styles.owner}>
            <img src={data?.unit?.owner?.image} alt="owner_img" />
            <p>{data?.unit?.owner?.name} </p>
            <p>{data?.unit?.owner?.phone} </p>
          </div>
        ) : (
          <ShimmerThumbnail height={175} rounded />
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
