import { useEffect, useState } from "react";
import styles from "./properties.module.css";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import Breadcrumb from "../../Components/BreadCrumb";
import { getPropertyDetails } from "../../app/Apis/PropertyApis";
import ReactStars from "react-rating-stars-component";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import GoogleMapReact from "google-map-react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import ReviewsCard from "../../Components/ReviewsCard/ReviewsCard";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";
import YourComponent from "../../Components/YourComponent/YourComponent";
// import originalMoment from "moment";
// import { extendMoment } from "moment-range";
// const moment = extendMoment(originalMoment);

export default function propertyDetails() {
  const intl = useIntl();
  let { lang } = useSelector((state) => state.language);
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});

  useEffect(
    function () {
      if (id) {
        getPropertyDetails(id).then((res) => {
          setData(res.data);
        });
      }
    },
    [id, lang]
  );

  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }

  const items = [
    { label: "Home", url: "/" },
    { label: "Properties", url: "/properties" },
  ];

  return (
    <div  dir={lang === "ar" ? "rtl" : "ltr"}  className={styles.properties_details_container}>
      {/* Head */}
      <div className={`flex-center ${styles.head}`}>
        <div className={styles.bread_crumb}>
          <Breadcrumb items={items} />
        </div>
        <div className={styles.actions}>
          <span className="cursor-pointer">
            <img src="/assets/green-heart.png" alt="favorite" />
            <span>
              <FormattedMessage id="addToFav" />
            </span>
          </span>
          <span className="cursor-pointer">
            <img src="/assets/share.png" alt="share" />
            <span>
              <FormattedMessage id="share" />
            </span>
          </span>
        </div>
      </div>

      {data && (
        <div className={`flex-center my-3`}>
          <h2 className={styles.title}>{data?.title}</h2>
          <div>
            {data?.rate && (
              <ReactStars
                count={5}
                edit={false}
                size={24}
                value={data.rate}
                activeColor="#FDB022"
              />
            )}
          </div>
        </div>
      )}

      {data?.images?.length > 0  ? (
        <div className={styles.images}>
          <div className="flex-center mb-3">
            <img src={data?.images[0]?.url} alt="Feature image" />
          </div>
          <div className="flex-center mb-5">
            {data?.images[1]?.url && (
              <div className={styles.feature_images}>
                <img src={data?.images[1]?.url} alt="Feature image" />
              </div>
            )}
            {data?.images[2]?.url && (
              <div className={styles.feature_images}>
                <img src={data?.images[2]?.url} alt="Feature image" />
              </div>
            )}
            {data?.images[3]?.url && (
              <div className={styles.feature_images}>
                <img src={data?.images[3]?.url} alt="Feature image" />
              </div>
            )}
          </div>
        </div>
      ):  (
          <>
        <ShimmerThumbnail  height={500} rounded />
        <div className={styles.shimmer_wrapper}>
          {[...Array(3)].map((e, i) => (
            <ShimmerThumbnail key={i} height={300} rounded />
            ))}
        </div>
            </>
      )}

      <div className="d-flex gap-5 mb-5">
        <div className="col-md-6">
          <div className="properties-details">
            <div className={styles.specs}>
              <div className="flex-center">
                <span>
                  <img src="/assets/bed.png" alt="bed" />
                </span>
                <span className={styles.flex_column}>
                  <span>
                    <FormattedMessage id="bedroom" />
                  </span>
                  <span>
                    {data?.bed_rooms} <FormattedMessage id="rooms" />
                  </span>
                </span>
              </div>
              <div className="flex-center">
                <span>
                  <img src="/assets/bath.png" alt="bed" />
                </span>
                <span className={styles.flex_column}>
                  <span>
                    <FormattedMessage id="bathroom" />
                  </span>
                  <span>
                    {data?.bathrooms} <FormattedMessage id="rooms" />
                  </span>
                </span>
              </div>
              {/* <div className="flex-center">
                <span>
                  <img src="/assets/area.png" alt="bed" />
                </span>
                <span className={styles.flex_column}>
                  <span>
                    <FormattedMessage id="area" />
                  </span>
                  <span>
                    450 <FormattedMessage id="ft" />
                  </span>
                </span>
              </div> */}
            </div>
            <div className={styles.price}>
              <span>
                {data?.default_price} <FormattedMessage id="le" />
              </span>
              <span>
                {" "}
                / <FormattedMessage id="day" />
              </span>
            </div>
          </div>
          <div className={styles.over_view}>
            <div className={styles.title}>
              <FormattedMessage id="overview" />
            </div>
            {Object.keys(data).length>0 ? <div className={styles.description}>{data?.title}</div>: <ShimmerThumbnail height={25} rounded />}
            {Object.keys(data).length>0 ?<div className={styles.about}>{data?.description}</div>:<ShimmerThumbnail height={80} rounded />}
          </div>
          <div className={styles.features}>
            <div className={styles.title}></div>
            <div className={styles.features_wrapper}>
              {data?.features?.length>0 ? data.features?.map((feature) => {
                return (
                  <div>
                    <img
                      width="34px"
                      height="34px"
                      src={feature.url}
                      key={feature.id}
                    />
                    <p>{feature.name}</p>
                  </div>
                );
              }): [...Array(3)].map((e, i) => (
                <ShimmerThumbnail key={i} height={250} rounded />
              ))}
            </div>
          </div>

          <div className={styles.over_view}>
            <div className={styles.title}>
              <FormattedMessage id="Cancellation Policy" />
            </div>

            <div
              className={styles.link}
              onClick={() => (window.location = "/policy")}
            >
              <FormattedMessage id="Free-free cancellation" /> {" >>"}
            </div>
          </div>

          <div className={styles.over_view}>
            <div className={styles.title}>
              <FormattedMessage id="Property Owner" />
            </div>

            {data?.owner?.name ? <div className={styles.owner}>
              <img src={data?.owner?.image} alt="owner_img" />
              <p>{data?.owner?.name} </p>
              <p>{data?.owner?.phone} </p>
            </div>:  <ShimmerThumbnail height={175} rounded />}
          </div>
        </div>
        <div className="col-md-6">
          <div className={styles.date_range_wrapper}>
            <div className={styles.date_title}>
              <img src="/assets/availability.png" alt="availability-icon" />
              <span>
                {" "}
                <FormattedMessage id="Avaliability" />{" "}
              </span>
            </div>
       
            <YourComponent />
            <DateRangePicker
              // value={value}
              // onSelect={onSelect}
              singleDateRange={true}
            />
          </div>
          <div className={styles.over_view}>

<div className={styles.title}>
  <FormattedMessage id="Location" />
  </div>

          <div style={{ height: "400px", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBM6oDJmN4CA3NbENg1IMDlK2KinpZOuLI",
              }}
              defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
              defaultZoom={12}
            ></GoogleMapReact>
          </div>
</div>
        </div>
      </div>
      <div className={styles.reviews}>
        <div className={styles.title}>
          <FormattedMessage id="Reviews" />
        </div>
        <div className="row flex-wrap">
          {data.reviews ? data.reviews.map((review) => (
            <div className="col-sm-6 mb-4" key={review?.id}>
              <ReviewsCard
                imgSrc={review?.user?.image}
                name={review?.user?.name}
                review={review?.message}
                subTitle={review?.user?.email}
                rate={review?.unit_rate}
              />
            </div>
          )):

[...Array(4)].map((e, i) => (
  <div className="col-sm-6 mb-4">
            <ShimmerThumbnail key={i} height={170} rounded />
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}