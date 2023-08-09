import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Breadcrumb from "../Components/BreadCrumb";
import { getPropertyDetails, reserveUnit } from "../app/Apis/PropertyApis";
import ReactStars from "react-rating-stars-component";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ShimmerThumbnail } from "react-shimmer-effects";
import ReviewsCard from "../Components/ReviewsCard/ReviewsCard";
import { useSelector } from "react-redux";
import store, { langAction } from "../store";
import DateRangePicker from "../Components/DateRangePicker/DateRangePicker";
import moment from "moment";
import ModalComponent from "../Components/Modal/Modal";
import MapContainer from "../Components/Map/MapContainer";
import { addToFavourite, removeFromFavourite } from "../app/Apis/UnitsApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./properties.module.css";

export default function PropertyDetails() {
  let { lang } = useSelector((state) => state.language);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedRange, setSelectedRange] = useState("");
  const [daysCount, setDaysCount] = useState(0);
  const [totalReservationMoney, setTotalReservationMoney] = useState(0);
  const [modifiedReservedDays, setModifiedReservedDays] = useState([]);
  const [extractedDates, setExtractedDates] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const toggleGalleryModal = () => setIsGalleryModalOpen(!isGalleryModalOpen);
  const [showComponent, setShowComponent] = useState(false);
  const [mapPosition, setMapPosition] = useState(null);

  const handleRedirectToOwnerProfile = (id) => {
    router.push(`/owner/${id}`);
  };

  useEffect(() => {
    setShowComponent(
      typeof window !== "undefined" && localStorage.getItem("access_token")
    );
  }, []);

  function calculateNumberOfDays(startDate, endDate) {
    const start = new Date(startDate.toUTCString());
    const end = new Date(endDate.toUTCString());
    const timeDiff = Math.abs(end - start);
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return days;
  }

  function getPriceForDateRange(data, dateRange, defaultPrice) {
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    let currentDate = new Date(startDate);
    const result = [];

    while (currentDate <= endDate) {
      const matchingObject = data.find((obj) => {
        const fromDate = new Date(obj.from);
        const toDate = new Date(obj.to);

        return fromDate <= currentDate && currentDate <= toDate;
      });

      const price = matchingObject ? matchingObject.price : defaultPrice;

      result.push({
        date: currentDate.toDateString(),
        price: price,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  }
  useEffect(() => {
    if (data?.active_reservations?.length > 0) {
      const extractedDates = [];

      const modifiedData = data?.active_reservations?.map((obj) => {
        const fromDate = new Date(obj.from);
        extractedDates.push(fromDate.toISOString());
        fromDate.setDate(fromDate.getDate() + 1);
        const newObj = { ...obj, from: fromDate.toISOString() };
        return newObj;
      });
      setModifiedReservedDays(modifiedData);
      setExtractedDates(extractedDates);
    }
  }, [data?.active_reservations]);

  const handleShowReservationModal = (selectedDateRange) => {
    setSelectedRange(selectedDateRange);
    const days = calculateNumberOfDays(
      selectedDateRange.startDate,
      selectedDateRange.endDate
    );
    setDaysCount(days);
    const result = getPriceForDateRange(
      data?.active_ranges,
      selectedDateRange,
      data?.default_price
    ).reduce((total, item) => total + item.price, 0);
    setIsOpen(true);
    setTotalReservationMoney(result);
  };

  useEffect(
    function () {
      if (id) {
        getPropertyDetails(id).then((res) => {
          setData(res.data);
          res?.data?.latitude &&
            res?.data?.longitude &&
            setMapPosition({
              lat: res?.data?.latitude,
              lng: res?.data?.longitude,
            });
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

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}?idKey=${id}&targetKey=unit`
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleImageGallery = () => {
    toggleGalleryModal();
  };

  const handleAddToFavourite = (e, id) => {
    e.stopPropagation();
    data?.is_favourite
      ? removeFromFavourite(id).then((res) => {
          getPropertyDetails(id).then((resp) => {
            setData(resp.data);
          });
          toast.success(
            lang === "ar"
              ? "تمت إزالة العنصر من المفضلة"
              : "Item removed from favorites!",
            { autoClose: 5000 }
          );
        })
      : addToFavourite(id).then((res) => {
          getPropertyDetails(id).then((resp) => {
            setData(resp.data);
          });
          toast.success(
            lang === "ar"
              ? "تمت إضافة العنصر إلي المفضلة"
              : "Item added to favorites!",
            { autoClose: 5000 }
          );
        });
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={styles.properties_details_container}
    >
      {/* Head */}
      <div className={`flex-center ${styles.head}`}>
        <div className={styles.bread_crumb}>
          <Breadcrumb items={items} />
        </div>
        <div className={styles.actions}>
          {showComponent && data?.is_favourite ? (
            <span
              className="cursor-pointer"
              onClick={(e) => handleAddToFavourite(e, data?.id, "remove")}
            >
              <img src="/assets/green-heart.png" alt="favorite" />
              <span>
                <FormattedMessage id="removeFromFav" />
              </span>
            </span>
          ) : (
            <span
              className="cursor-pointer"
              onClick={(e) => handleAddToFavourite(e, id, "add")}
            >
              <img src="/assets/green-heart.png" alt="favorite" />
              <span>
                <FormattedMessage id="addToFav" />
              </span>
            </span>
          )}
          <span className="cursor-pointer" onClick={handleShare}>
            {!isCopied && <img src="/assets/share.png" alt="share" />}
            <span>
              {isCopied ? (
                <span className={styles.copied_link}>
                  <FormattedMessage id="link copied" />{" "}
                </span>
              ) : (
                <FormattedMessage id="share" />
              )}
            </span>
          </span>
        </div>
      </div>

      {data && (
        <div className={`flex-center my-3 rating_mobile`}>
          <h2 className={styles.title}>{data?.title}</h2>
          <div>
            {data?.rate > 0 && (
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

      {data?.images?.length > 0 ? (
        <div
          className={`${styles.images} ${
            data.images.length > 4 && "cursor-pointer"
          }`}
          onClick={() => {
            data.images.length > 4 && handleImageGallery();
          }}
        >
          <div className="flex-center mb-3">
            <img src={data?.images[0]?.url} alt="Feature image" />
          </div>
          <div className="flex-center mb-5">
            {data.images.slice(1, 4).map(
              (image, index) =>
                image.url && (
                  <div
                    key={index}
                    className={`${
                      index === 2
                        ? styles.feature_images_dark
                        : styles.feature_images
                    }`}
                  >
                    <div className={`${index === 2 ? styles.top : ""}`}>
                      <img src={image.url} alt="Feature image" />
                      {index === 2 && data.images.length > 4 && (
                        <p className={styles.overlay}>
                          +{data.images.length - 4}
                        </p>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      ) : (
        <>
          <ShimmerThumbnail height={500} rounded />
          <div className={styles.shimmer_wrapper}>
            {[...Array(3)].map((e, i) => (
              <ShimmerThumbnail key={i} height={300} rounded />
            ))}
          </div>
        </>
      )}

      <div className="d-flex gap-5 mb-5 properties_mobile ">
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
            {data && Object.keys(data).length > 0 ? (
              <div className={styles.description}>{data?.title}</div>
            ) : (
              <ShimmerThumbnail height={25} rounded />
            )}
            {data && Object.keys(data).length > 0 ? (
              <div className={styles.about}>{data?.description}</div>
            ) : (
              <ShimmerThumbnail height={80} rounded />
            )}
          </div>
          <div className={styles.features}>
            <div className={styles.title}></div>
            <div className={styles.features_wrapper}>
              {data?.features?.length > 0
                ? data.features?.map((feature, i) => {
                    return (
                      <div key={i}>
                        <img
                          width="34px"
                          height="34px"
                          src={feature.url}
                          key={feature.id}
                        />
                        <p>{feature.name}</p>
                      </div>
                    );
                  })
                : [...Array(3)].map((e, i) => (
                    <ShimmerThumbnail key={i} height={250} rounded />
                  ))}
            </div>
          </div>

          <div className={styles.over_view}>
            <div
              className={styles.title}
              onClick={() => (window.location = "/policy")}
            >
              <FormattedMessage id="Cancellation Policy" />
            </div>

            {/* <div
              className={styles.link}
              onClick={() => (window.location = "/policy")}
            >
              <FormattedMessage id="Free-free cancellation" /> {" >>"}
            </div> */}
          </div>

          <div className={styles.over_view}>
            <div className={styles.title}>
              <FormattedMessage id="Property Owner" />
            </div>

            {data?.owner?.name ? (
              <div
                className={styles.owner}
                onClick={() => handleRedirectToOwnerProfile(data?.owner?.id)}
              >
                <img src={data?.owner?.image} alt="owner_img" />
                <p>{data?.owner?.name} </p>
              </div>
            ) : (
              <ShimmerThumbnail height={175} rounded />
            )}
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

            {data && Object.keys(data).length > 0 && (
              <DateRangePicker
                activeRanges={data?.active_ranges}
                defaultPrice={data?.default_price}
                activeReservations={data?.active_reservations}
                handleShowReservationModal={handleShowReservationModal}
                extractedDates={extractedDates}
                modifiedReservedDays={modifiedReservedDays}
              />
            )}
          </div>
          <div className={styles.over_view}>
            {mapPosition && (
              <div className={styles.title}>
                <FormattedMessage id="Location" />
              </div>
            )}
            {mapPosition && Object.keys(data).length > 0 && (
              <MapContainer
                mapPosition={{ lat: +mapPosition.lat, lng: +mapPosition.lng }}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.reviews}>
        {data?.reviews?.length > 0 && (
          <div className={styles.title}>
            <FormattedMessage id="Reviews" />
          </div>
        )}
        <div className="row flex-wrap">
          {data?.reviews
            ? data.reviews.map((review) => (
                <div className="col-sm-6 mb-4" key={review?.id}>
                  <ReviewsCard
                    imgSrc={review?.user?.image}
                    name={review?.user?.name}
                    review={review?.message}
                    subTitle={review?.user?.email}
                    rate={review?.unit_rate}
                  />
                </div>
              ))
            : [...Array(4)].map((e, i) => (
                <div key={i} className="col-sm-6 mb-4">
                  <ShimmerThumbnail height={170} rounded />
                </div>
              ))}
        </div>
      </div>

      <ModalComponent
        isOpen={isOpen}
        toggleModal={toggleModal}
        className={styles.summary_modal}
        modalBody={
          <div className={styles.summary_container}>
            <p className={styles.title}>
              <FormattedMessage id="Summary" />{" "}
            </p>
            <div className={styles.summary_card}>
              <div className={styles.unit_type_wrapper}>
                <div className={styles.unit_type}>challet</div>
                <div className={styles.rating_wrapper}>
                  <img src="/assets/star.png" alt="star" />
                  <span className={styles.rate}>{data?.rate}</span>
                </div>
              </div>
              <img
                className={styles.card_image}
                src={data?.images?.[0]?.url}
                alt="unit_image"
              />
              <p className={styles.unit_title}>{data?.title}</p>
            </div>
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
                {daysCount} <FormattedMessage id="nights" />
              </div>
            </div>
            <div className={styles.from_to_wrapper}>
              <p>
                <span className={styles.label}>
                  <FormattedMessage id="from" />
                </span>
                <span className={styles.date}>
                  {moment(selectedRange.startDate).format("ddd, DD MMM")}
                </span>
              </p>
              <p>
                <span className={styles.label}>
                  <FormattedMessage id="to" />
                </span>
                <span className={styles.date}>
                  {moment(selectedRange.endDate).format("ddd, DD MMM")}
                </span>
              </p>
            </div>
            <hr className={styles.total_price_hr} />
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex gap-2">
                <img
                  src="/assets/money.png"
                  alt="money"
                  width="30"
                  height="20"
                />
                <p className={styles.reservation_date}>
                  <FormattedMessage id="total_cost" />{" "}
                </p>
              </div>
              <div className={styles.total_money}>
                {totalReservationMoney} {" LE"}
              </div>
            </div>

            <button
              className={styles.submit_reservations}
              onClick={() => {
                const submitData = {
                  from: moment(selectedRange.startDate).format("D-M-YYYY"),
                  to: moment(selectedRange.endDate).format("D-M-YYYY"),
                  unit_id: id,
                  unit_type: data.type,
                };
                reserveUnit(submitData).then((res) => {
                  if (res) {
                    router.push("/reservations");
                  }
                  getPropertyDetails(id).then((resp) => {
                    setData(resp.data);
                  });
                  setIsOpen(false);
                });
              }}
            >
              <FormattedMessage id="submit" />{" "}
            </button>
          </div>
        }
      />

      <ModalComponent
        isOpen={isGalleryModalOpen}
        toggleModal={toggleGalleryModal}
        className={styles.image_gallery}
        modalBody={
          <Carousel showThumbs={false} showStatus={false} emulateTouch={true}>
            {data?.images?.map((slide) => (
              <div key={slide.id}>
                <div
                  className={styles.carousel_img}
                  style={{ backgroundImage: `url(${slide.url}` }}
                ></div>
              </div>
            ))}
          </Carousel>
        }
      />
      <ToastContainer />
    </div>
  );
}