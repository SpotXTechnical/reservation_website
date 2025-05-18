import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Breadcrumb from "../../Components/BreadCrumb";
import {
  getHotelRoomReservationDetails,
  getPropertyDetails,
  getPropertyReservationDetails,
  reserveUnit,
} from "../../app/Apis/PropertyApis";
import ReactStars from "react-rating-stars-component";
import { Carousel } from "react-responsive-carousel";
import { ShimmerThumbnail } from "react-shimmer-effects";
import ReviewsCard from "../../Components/ReviewsCard/ReviewsCard";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";
import DateRangePicker from "../../Components/DateRangePicker/DateRangePicker";
import moment from "moment";
import ModalComponent from "../../Components/Modal/Modal";
import MapContainer from "../../Components/Map/MapContainer";
import { addToFavourite, removeFromFavourite } from "../../app/Apis/UnitsApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Loading from "../../Components/Loading/Loading";
import { getFaqs } from "../../app/Apis/Faqs";
import Head from "next/head";
import Title from "../../Components/SharedComponents/Title/Title";
import PropertyCarousel from "../../Components/PropertyCarousel";
import GuestMealsSelector from "../../Components/GuestMealsSelector";
import UnitBookingSummary from "../../Components/UnitBookingSummary";

export default function PropertyDetails() {
  let { lang } = useSelector((state) => state.language);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedRange, setSelectedRange] = useState("");
  const [daysCount, setDaysCount] = useState(0);
  const [modalData, setModalData] = useState();
  const [totalReservationMoney, setTotalReservationMoney] = useState(0);
  const [modifiedReservedDays, setModifiedReservedDays] = useState([]);
  const [extractedDates, setExtractedDates] = useState([]);
  const [faqs, setFaqs] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  const [reservationData, setReservationData] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [summaryModalLoading, setSummaryModalLoading] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const toggleGalleryModal = () => setIsGalleryModalOpen(!isGalleryModalOpen);
  const [showComponent, setShowComponent] = useState(false);
  const [mapPosition, setMapPosition] = useState(null);
  const [showHotelCalendar, setShowHotelCalendar] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const handleRedirectToOwnerProfile = (id) => {
    router.push(`/owner/${id}`);
  };

  useEffect(() => {
    setShowComponent(
      typeof window !== "undefined" && localStorage.getItem("access_token")
    );
  }, []);

  useEffect(() => {
    if (id) {
      getFaqs({
        questionable_id: id,
        questionable_type: "unit",
      }).then((response) => {
        setFaqs(response.data);
      });
    }
  }, [id]);

  function calculateNumberOfDays(startDate, endDate) {
    const start = new Date(startDate.toUTCString());
    const end = new Date(endDate.toUTCString());
    const timeDiff = Math.abs(end - start);
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return days;
  }
  function parseTime(timeToParse) {
    const time = new Date("2000-01-01 " + timeToParse);

    const hours = time.getHours();
    const minutes = time.getMinutes();

    const period = hours < 12 ? "AM" : "PM";

    const formattedHours = hours % 12 || 12;

    const formattedTime = `${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;

    return formattedTime;
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
    if (reservationData?.active_reservations?.length > 0) {
      const extractedDates = [];

      const modifiedData = reservationData?.active_reservations?.map((obj) => {
        const fromDate = new Date(obj.from);
        extractedDates.push(fromDate.toISOString());
        fromDate.setDate(fromDate.getDate());
        const newObj = { ...obj, from: fromDate.toISOString() };
        return newObj;
      });
      setModifiedReservedDays(modifiedData);
      setExtractedDates(extractedDates);
    }
  }, [reservationData?.active_reservations]);

  const handleShowReservationModal = (reservaionSummary) => {
    setModalData(reservaionSummary);
    setDaysCount(reservaionSummary?.nights);
    setTotalReservationMoney(reservaionSummary?.total_price);
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

          if (res.data.type !== "hotel") {
            getPropertyReservationDetails(id).then((res) => {
              setReservationData(res);
            });
          }
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

  const handleGuestMealsSelection = (queryString, summaryData) => {
    getHotelRoomReservationDetails(id, queryString).then((res) => {
      setReservationData(res);
      setShowHotelCalendar(true);
      setSummaryData(summaryData);
    });
  };

  const reserveUnitCallback = () => {
    const formData = new FormData();
    formData.append("from", moment(modalData?.from).format("D-M-YYYY"));
    formData.append("to", moment(modalData?.to).format("D-M-YYYY"));
    formData.append("unit_id", id);
    formData.append("unit_type", data.type);
    if (data.type === "hotel") {
      formData.append("meal_id", summaryData?.modifiedSelectedMeal?.id);
      formData.append("adults", summaryData?.adults);
      summaryData?.childrenFormRanges?.forEach((child) => {
        formData.append("children[]", child);
      });
    }

    reserveUnit(formData).then((res) => {
      setIsOpen(false);
      if (res) {
        router.push("/reservations");
      }
    });
  };
  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="tw-w-full tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-6"
    >
      <Head>
        <title>{data?.title || "Loading..."}</title>
        <meta name="description" content={data?.description} />
      </Head>

      {/* Header Section - Improved mobile layout */}
      <div className="tw-flex tw-flex-col lg:tw-flex-row tw-justify-between tw-items-start lg:tw-items-center tw-gap-4 tw-mb-6 tw-border-b tw-border-gray-100 tw-pb-4">
        {/* Breadcrumb */}
        <div className="tw-flex-shrink-0 tw-w-full lg:tw-w-auto">
          <Breadcrumb items={items} />
        </div>

        {/* Actions - Better mobile stacking */}
        <div className="tw-flex tw-items-center tw-flex-wrap tw-gap-3 tw-w-full lg:tw-w-auto tw-justify-start lg:tw-justify-end lg:tw-ml-auto">
          {/* Favorite Button */}
          {showComponent && (
            <button
              className="tw-group tw-flex tw-items-center tw-gap-2 tw-transition-all tw-duration-300 tw-ease-in-out tw-px-3 tw-py-2 tw-rounded-lg hover:tw-bg-gray-50 tw-min-w-fit"
              onClick={(e) =>
                handleAddToFavourite(
                  e,
                  data?.id || id,
                  data?.is_favourite ? "remove" : "add"
                )
              }
            >
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                enableBackground="new 0 0 64 64"
                className="tw-w-5 tw-h-5 sm:tw-w-6 sm:tw-h-6 tw-fill-gray-400"
              >
                <path
                  fill="none"
                  stroke="#44bcb7"
                  className={`group-hover:tw-stroke-[#44bcb7] tw-transition-all tw-duration-300 tw-ease-in-out ${
                    data?.is_favourite ? "tw-fill-[#44bcb7]" : ""
                  } ${
                    !data?.is_favourite ? "group-hover:tw-fill-[#44bcb7] " : ""
                  }`}
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  d="M1,21c0,20,31,38,31,38s31-18,31-38
	c0-8.285-6-16-15-16c-8.285,0-16,5.715-16,14c0-8.285-7.715-14-16-14C7,5,1,12.715,1,21z"
                />
              </svg>
              <span className="tw-text-xs sm:tw-text-sm tw-font-medium tw-text-[#44bcb7]">
                <FormattedMessage
                  id={data?.is_favourite ? "removeFromFav" : "addToFav"}
                />
              </span>
            </button>
          )}

          {/* Share Button */}
          <button
            className="tw-flex tw-items-center tw-gap-2 tw-transition-all tw-duration-300 tw-ease-in-out tw-px-3 tw-py-2 tw-rounded-lg hover:tw-bg-gray-50 tw-min-w-fit"
            onClick={handleShare}
          >
            {!isCopied && (
              <img
                src="/assets/share.png"
                alt="share"
                className="tw-w-4 tw-h-4 sm:tw-w-5 sm:tw-h-5 tw-opacity-70 tw-transition-transform tw-duration-300 hover:tw-scale-110"
              />
            )}
            <span
              className={`tw-text-xs sm:tw-text-sm tw-font-medium ${
                isCopied ? "tw-text-[#44bcb7]" : "tw-text-[#a2a2a2]"
              }`}
            >
              {isCopied ? (
                <span className="tw-flex tw-items-center tw-gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tw-h-3 tw-w-3 sm:tw-h-4 sm:tw-w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <FormattedMessage id="link copied" />
                </span>
              ) : (
                <FormattedMessage id="share" />
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Title and Rating Section - Better mobile layout */}
      {data && (
        <div className="tw-w-full tw-flex tw-flex-col sm:tw-flex-row tw-items-start sm:tw-items-center tw-justify-between tw-gap-4 tw-py-4 tw-mb-4">
          <div className="tw-flex-1 tw-min-w-0">
            <Title text={data?.title} />
          </div>

          <div className="tw-flex tw-items-center tw-gap-2 tw-flex-shrink-0">
            {data?.rate > 0 && (
              <>
                <ReactStars
                  count={5}
                  edit={false}
                  size={20}
                  value={data.rate}
                  activeColor="#FDB022"
                />
                <span className="tw-text-sm tw-font-medium tw-text-gray-500">
                  {data.rate?.toFixed(1)}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Image Gallery Section - Improved responsiveness */}
      {data?.images?.length > 0 ? (
        <div
          className="tw-w-full tw-cursor-pointer tw-mb-6"
          onClick={handleImageGallery}
        >
          {/* Main Feature Image */}
          <div className="tw-w-full tw-overflow-hidden tw-rounded-xl tw-mb-3 tw-shadow-sm tw-bg-gray-100">
            {data?.images[0]?.type === "image" ? (
              <img
                src={data?.images[0]?.url}
                alt="Feature image"
                className="tw-w-full tw-h-[280px] sm:tw-h-[350px] md:tw-h-[400px] lg:tw-h-[450px] xl:tw-h-[500px] tw-object-cover tw-transition-transform tw-duration-500 hover:tw-scale-105"
              />
            ) : (
              <video
                src={data?.images[0]?.url}
                controls={true}
                className="tw-w-full tw-h-[280px] sm:tw-h-[350px] md:tw-h-[400px] lg:tw-h-[450px] xl:tw-h-[500px] tw-object-cover"
              ></video>
            )}
          </div>

          {/* Thumbnail Gallery - Responsive grid */}
          <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 tw-gap-2 sm:tw-gap-3">
            {data.images.slice(1, 4).map(
              (image, index) =>
                image.url && (
                  <div
                    key={index}
                    className={`tw-relative tw-overflow-hidden tw-rounded-lg tw-shadow-sm ${
                      index === 2 ? "tw-overlay-container" : ""
                    }`}
                  >
                    <div className="tw-h-[100px] sm:tw-h-[120px] md:tw-h-[150px] lg:tw-h-[180px] xl:tw-h-[220px]">
                      {image.type === "image" ? (
                        <img
                          src={image.url}
                          alt="Gallery image"
                          className="tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-500 hover:tw-scale-105"
                        />
                      ) : (
                        <video
                          src={image.url}
                          className="tw-w-full tw-h-full tw-object-cover"
                          controls={true}
                        ></video>
                      )}

                      {/* Overlay with count for last thumbnail */}
                      {index === 2 && data.images.length > 4 && (
                        <div className="tw-absolute tw-inset-0 tw-bg-black/60 tw-flex tw-items-center tw-justify-center tw-transition-opacity tw-duration-300">
                          <p className="tw-text-white tw-font-semibold tw-text-lg sm:tw-text-xl md:tw-text-2xl">
                            +{data.images.length - 4}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      ) : (
        <div>
          <ShimmerThumbnail height={400} rounded />
          <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 tw-gap-2 sm:tw-gap-3 tw-mt-3">
            {[...Array(3)].map((_, i) => (
              <ShimmerThumbnail key={i} height={150} rounded />
            ))}
          </div>
        </div>
      )}

      {/* Main Content Grid - Better responsive breakpoints */}
      <div className="tw-container tw-mx-auto tw-px-0 tw-py-8 tw-max-w-7xl">
        <div className="tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-gap-8 xl:tw-grid-cols-2">
          {/* Left Column - Property Details */}
          <div className="tw-space-y-6 lg:tw-space-y-8">
            {/* Property Specs & Price Card - Improved mobile layout */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-overflow-hidden">
              <div className="tw-flex tw-flex-col lg:tw-flex-row tw-justify-between tw-p-4 sm:tw-p-6">
                <div className="tw-flex tw-flex-col sm:tw-flex-row tw-space-y-4 sm:tw-space-y-0 sm:tw-space-x-6 lg:tw-space-x-8 tw-mb-4 lg:tw-mb-0">
                  {/* Bedrooms */}
                  <div className="tw-flex tw-items-center">
                    <span className="tw-bg-blue-50 tw-p-2 tw-rounded-full">
                      <img
                        src="/assets/bed.png"
                        alt="bedroom"
                        className="tw-h-5 tw-w-5 sm:tw-h-6 sm:tw-w-6"
                      />
                    </span>
                    <div className="tw-flex tw-flex-col tw-ml-3">
                      <span className="tw-text-gray-500 tw-text-xs sm:tw-text-sm">
                        <FormattedMessage id="bedroom" />
                      </span>
                      <span className="tw-font-semibold tw-text-sm sm:tw-text-base tw-text-center">
                        {data?.bed_rooms}
                      </span>
                    </div>
                  </div>

                  {/* Bathrooms */}
                  <div className="tw-flex tw-items-center">
                    <span className="tw-bg-blue-50 tw-p-2 tw-rounded-full">
                      <img
                        src="/assets/bath.png"
                        alt="bathroom"
                        className="tw-h-5 tw-w-5 sm:tw-h-6 sm:tw-w-6"
                      />
                    </span>
                    <div className="tw-flex tw-flex-col tw-ml-3">
                      <span className="tw-text-gray-500 tw-text-xs sm:tw-text-sm">
                        <FormattedMessage id="bathroom" />
                      </span>
                      <span className="tw-font-semibold tw-text-sm sm:tw-text-base tw-text-center">
                        {data?.bathrooms}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="tw-flex tw-items-center tw-justify-start lg:tw-justify-end">
                  <div className="tw-bg-[#44bcb7] tw-text-white tw-px-3 sm:tw-px-4 tw-py-2 tw-rounded-lg">
                    <span className="tw-text-lg sm:tw-text-xl tw-font-bold">
                      {data?.current_price}
                    </span>
                    <span className="tw-text-blue-100">
                      {" "}
                      <FormattedMessage id="le" />
                    </span>
                    <span className="tw-text-xs sm:tw-text-sm">
                      {" "}
                      / <FormattedMessage id="day" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4 sm:tw-p-6">
              <h2 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-mb-4 tw-text-gray-800">
                <FormattedMessage id="overview" />
              </h2>

              {data && Object.keys(data).length > 0 ? (
                <>
                  <h3 className="tw-text-lg sm:tw-text-xl tw-font-semibold tw-mb-3 tw-text-gray-700">
                    {data?.title}
                  </h3>
                  <p className="tw-text-sm sm:tw-text-base tw-text-gray-600 tw-leading-relaxed">
                    {data?.description}
                  </p>
                </>
              ) : (
                <>
                  <ShimmerThumbnail height={25} rounded />
                  <div className="tw-mt-4">
                    <ShimmerThumbnail height={80} rounded />
                  </div>
                </>
              )}
            </div>

            {/* Features Section - Improved responsive grid */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4 sm:tw-p-6">
              <h2 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-mb-4 sm:tw-mb-6 tw-text-gray-800">
                <FormattedMessage
                  id="moreFeatures"
                  defaultMessage="moreFeatures"
                />
              </h2>

              <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-4 sm:tw-gap-6">
                {data?.features?.length > 0
                  ? data.features?.map((feature, i) => (
                      <div
                        key={i}
                        className="tw-flex tw-flex-col tw-items-center tw-text-center"
                      >
                        <div className="tw-bg-[#44bcb7] tw-rounded-full tw-p-3 sm:tw-p-4 tw-mb-2 sm:tw-mb-3">
                          <img
                            width="24px"
                            height="24px"
                            src={feature.url}
                            key={feature.id}
                            alt={feature.name}
                            className="tw-w-6 tw-h-6 sm:tw-w-8 sm:tw-h-8"
                          />
                        </div>
                        <p className="tw-text-xs sm:tw-text-sm tw-text-gray-700 tw-leading-tight">
                          {feature.name}
                        </p>
                      </div>
                    ))
                  : [...Array(3)].map((e, i) => (
                      <ShimmerThumbnail key={i} height={150} rounded />
                    ))}
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4 sm:tw-p-6">
              <h2
                className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-mb-4 tw-text-gray-800 tw-cursor-pointer"
                onClick={() => (window.location = "/policy")}
              >
                <FormattedMessage id="Cancellation Policy" />
              </h2>

              <p className="tw-text-sm sm:tw-text-base tw-text-gray-600">
                Please read our{" "}
                <Link
                  href="/policy"
                  className="tw-text-blue-500 tw-font-medium hover:tw-underline"
                >
                  Refund Policy
                </Link>{" "}
                before cancellation.
              </p>
            </div>

            {/* Property Owner */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4 sm:tw-p-6">
              <h2 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-mb-4 tw-text-gray-800">
                <FormattedMessage id="Property Owner" />
              </h2>

              {data?.owner?.name ? (
                <div
                  className="tw-flex tw-items-center tw-cursor-pointer tw-bg-gray-50 tw-p-3 sm:tw-p-4 tw-rounded-lg hover:tw-bg-gray-100"
                  onClick={() => handleRedirectToOwnerProfile(data?.owner?.id)}
                >
                  <img
                    src={data?.owner?.image}
                    alt="owner_img"
                    className="tw-w-12 tw-h-12 sm:tw-w-16 sm:tw-h-16 tw-rounded-full tw-object-cover tw-border-2 tw-border-blue-300"
                  />
                  <p className="tw-ml-3 sm:tw-ml-4 tw-font-medium tw-text-base sm:tw-text-lg">
                    {data?.owner?.name}
                  </p>
                </div>
              ) : (
                <ShimmerThumbnail height={100} rounded />
              )}
            </div>

            {/* FAQ Section */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4 sm:tw-p-6">
              <h3 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-mb-4 sm:tw-mb-6 tw-text-gray-800">
                FAQs
              </h3>

              {faqs && faqs.length > 0 ? (
                <div className="tw-divide-y tw-divide-gray-200">
                  {faqs.map((faq) => (
                    <div className="tw-py-3 sm:tw-py-4" key={faq.id}>
                      <div className="tw-accordion-item">
                        <h2 className="tw-accordion-header">
                          <button
                            className="tw-w-full tw-flex tw-justify-between tw-items-center tw-text-left tw-font-medium tw-text-gray-800 tw-p-3 sm:tw-p-4 tw-rounded-lg tw-bg-gray-50 hover:tw-bg-gray-100 tw-text-sm sm:tw-text-base"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${faq.id}`}
                            aria-expanded="false"
                            aria-controls={`collapse${faq.id}`}
                          >
                            {faq.question}
                            <svg
                              className="tw-h-4 tw-w-4 sm:tw-h-5 sm:tw-w-5 tw-text-gray-500 tw-flex-shrink-0 tw-ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </h2>
                        <div
                          id={`collapse${faq.id}`}
                          className="tw-accordion-collapse tw-collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="tw-p-3 sm:tw-p-4 tw-bg-white tw-rounded-lg tw-mt-2 tw-text-gray-600 tw-text-sm sm:tw-text-base">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tw-bg-gray-50 tw-p-4 sm:tw-p-6 tw-rounded-lg tw-text-center">
                  <span className="tw-inline-block tw-px-3 sm:tw-px-4 tw-py-2 tw-bg-gray-200 tw-text-gray-700 tw-rounded-full tw-text-sm sm:tw-text-base">
                    There&apos;s no FAQs for this unit.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Availability & Map */}
          <div className="tw-space-y-6 lg:tw-space-y-8">
            {/* Availability Calendar */}
            {Object.keys(data).length > 0 && data?.type !== "hotel" && (
              <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4 sm:tw-p-6">
                <div className="tw-flex tw-items-center tw-mb-4 sm:tw-mb-6">
                  <div className="tw-bg-blue-50 tw-p-2 tw-rounded-full">
                    <img
                      src="/assets/availability.png"
                      alt="availability-icon"
                      className="tw-h-5 tw-w-5 sm:tw-h-6 sm:tw-w-6"
                    />
                  </div>
                  <h2 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-ml-3 tw-text-gray-800">
                    <FormattedMessage id="Avaliability" />
                  </h2>
                </div>

                <div className="tw-bg-gray-50 tw-p-3 sm:tw-p-4 tw-rounded-lg">
                  {Object.keys(data).length > 0 &&
                    reservationData?.active_ranges &&
                    reservationData?.active_reservations && (
                      <DateRangePicker
                        activeRanges={reservationData?.active_ranges}
                        defaultPrice={data?.default_price}
                        activeReservations={
                          reservationData?.active_reservations
                        }
                        handleShowReservationModal={handleShowReservationModal}
                        showModal={setIsOpen}
                        extractedDates={extractedDates}
                        modifiedReservedDays={modifiedReservedDays}
                        unitType={data?.type}
                        setModalLoadingState={setSummaryModalLoading}
                      />
                    )}
                </div>
              </div>
            )}

            {/* Hotel Guest Meals Selector */}
            {data.type === "hotel" && (
              <>
                <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4 sm:tw-p-6">
                  <GuestMealsSelector
                    ageRanges={data?.age_policies}
                    mealsOptions={data?.meals}
                    adultsNumber={data?.adults_number}
                    maxAdultsNumber={data?.max_adults_number}
                    freeChildrenNumber={data?.free_children_number}
                    maxChildrenNumber={data?.max_children_number}
                    onSelectGuestMeals={handleGuestMealsSelection}
                  />
                </div>

                {showHotelCalendar && (
                  <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4 sm:tw-p-6">
                    <div className="tw-flex tw-items-center tw-mb-4 sm:tw-mb-6">
                      <div className="tw-bg-blue-50 tw-p-2 tw-rounded-full">
                        <img
                          src="/assets/availability.png"
                          alt="availability-icon"
                          className="tw-h-5 tw-w-5 sm:tw-h-6 sm:tw-w-6"
                        />
                      </div>
                      <h2 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-ml-3 tw-text-gray-800">
                        <FormattedMessage id="Avaliability" />
                      </h2>
                    </div>

                    <div className="tw-bg-gray-50 p-0 md:tw-p-3 sm:tw-p-4 tw-rounded-lg">
                      {reservationData?.active_ranges &&
                        reservationData?.active_reservations && (
                          <DateRangePicker
                            activeRanges={reservationData?.active_ranges}
                            defaultPrice={data?.default_price}
                            activeReservations={
                              reservationData?.active_reservations
                            }
                            handleShowReservationModal={
                              handleShowReservationModal
                            }
                            showModal={setIsOpen}
                            extractedDates={extractedDates}
                            modifiedReservedDays={modifiedReservedDays}
                            unitType={data?.type}
                            setModalLoadingState={setSummaryModalLoading}
                          />
                        )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Map Section */}
            {mapPosition && (
              <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4 sm:tw-p-6 tw-z-10">
                <h2 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-mb-4 sm:tw-mb-6 tw-text-gray-800">
                  <FormattedMessage id="Location" />
                </h2>

                <div className="tw-rounded-lg tw-overflow-hidden tw-h-[250px] sm:tw-h-[300px] lg:tw-h-[350px]">
                  {mapPosition && Object.keys(data).length > 0 && (
                    <MapContainer
                      mapPosition={{
                        lat: +mapPosition.lat,
                        lng: +mapPosition.lng,
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section - Improved responsive grid */}
      <div className="tw-w-full tw-py-6 sm:tw-py-10 tw-px-0">
        {data?.reviews?.length > 0 && (
          <h3 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-mb-4 sm:tw-mb-6 tw-text-gray-800 tw-text-center sm:tw-text-left">
            <FormattedMessage id="Reviews" />
          </h3>
        )}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-4 tw-max-w-7xl tw-mx-auto">
          {data?.reviews
            ? data.reviews.map((review) => (
                <div className="tw-w-full" key={review?.id}>
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
                <div key={i} className="tw-w-full">
                  <ShimmerThumbnail height={170} rounded />
                </div>
              ))}
        </div>
      </div>

      {/* Modal Components - No changes needed as they're responsive by default */}
      <ModalComponent
        isOpen={isOpen}
        toggleModal={toggleModal}
        className=""
        modalBody={
          <UnitBookingSummary
            unitType={data?.type}
            checkInDate={moment(modalData?.from).format("ddd, DD MMM")}
            checkInTime={parseTime(modalData?.check_in)}
            checkOutDate={moment(modalData?.to).format("ddd, DD MMM")}
            checkOutTime={parseTime(modalData?.check_out)}
            rating={data?.rate}
            totalCost={totalReservationMoney}
            nights={daysCount}
            unitName={data?.title}
            unitImage={data?.images?.[0]?.url}
            adults={summaryData?.adults}
            childrenData={summaryData?.modifiedRangesCount}
            selectedMeal={summaryData?.modifiedSelectedMeal?.description}
            onSubmit={reserveUnitCallback}
          />
          // <div className="summary_container">
          //   {/* Loading */}
          //   {summaryModalLoading && <Loading />}
          //   {!summaryModalLoading && (
          //     <>
          //       <p className="title">
          //         <FormattedMessage id="Summary" />{" "}
          //       </p>
          //       <div className="summary_card">
          //         <div className="unit_type_wrapper">
          //           <div className="unit_type">challet</div>
          //           {data?.rate > 0 && (
          //             <div className="rating_wrapper">
          //               <img src="/assets/star.png" alt="star" />
          //               <span className="rate">{data?.rate}</span>
          //             </div>
          //           )}
          //         </div>
          //         <img
          //           className="card_image"
          //           src={data?.images?.[0]?.url}
          //           alt="unit_image"
          //         />
          //         <p className="unit_title">{data?.title}</p>
          //       </div>
          //       <div className="d-flex align-items-center justify-content-between">
          //         <div className="d-flex gap-2 align-items-center">
          //           <img
          //             src="/assets/ic_calendar.svg"
          //             alt="calendar"
          //             width="40"
          //             height="40"
          //           />
          //           <p className="reservation_date mb-0">
          //             <FormattedMessage id="Reservation_date" />{" "}
          //           </p>
          //         </div>
          //         <div className="nights">
          //           {daysCount} <FormattedMessage id="nights" />
          //         </div>
          //       </div>
          //       <div className="from_to_wrapper mt-3">
          //         <p className="d-flex justify-content-between">
          //           <span>
          //             <span className="label">
          //               <FormattedMessage id="from" />
          //             </span>
          //             <span className="date">
          //               {moment(modalData?.from).format("ddd, DD MMM")}
          //             </span>
          //           </span>
          //           <span>
          //             <span>{parseTime(modalData?.check_in)}</span>
          //           </span>
          //         </p>
          //         <p className="d-flex justify-content-between">
          //           <span>
          //             <span className="label">
          //               <FormattedMessage id="to" />
          //             </span>
          //             <span className="date">
          //               {moment(modalData?.to).format("ddd, DD MMM")}
          //             </span>
          //           </span>
          //           <span>
          //             <span>{parseTime(modalData?.check_out)}</span>
          //           </span>
          //         </p>
          //       </div>
          //       <hr className="total_price_hr" />
          //       <div className="d-flex align-items-center justify-content-between">
          //         <div className="d-flex gap-2 align-items-center">
          //           <img
          //             src="/assets/money.svg"
          //             alt="money"
          //             width="40"
          //             height="40"
          //           />
          //           <p className="reservation_date mb-0">
          //             <FormattedMessage id="total_cost" />{" "}
          //           </p>
          //         </div>
          //         <div className="total_money">
          //           {totalReservationMoney} {" LE"}
          //         </div>
          //       </div>

          //       <button
          //         className="submit_reservations"
          //         onClick={() => {
          //           const submitData = {
          //             from: moment(modalData?.from).format("D-M-YYYY"),
          //             to: moment(modalData?.to).format("D-M-YYYY"),
          //             unit_id: id,
          //             unit_type: data.type,
          //           };
          //           reserveUnit(submitData).then((res) => {
          //             if (res) {
          //               router.push("/reservations");
          //             }
          //             getPropertyDetails(id).then((resp) => {
          //               setData(resp.data);
          //             });
          //             setIsOpen(false);
          //           });
          //         }}
          //       >
          //         <FormattedMessage id="submit" />{" "}
          //       </button>
          //     </>
          //   )}
          // </div>
        }
      />

      <ModalComponent
        isOpen={isGalleryModalOpen}
        toggleModal={toggleGalleryModal}
        className="image_gallery mx-auto p-0 p-md-3"
        modalBody={<PropertyCarousel images={data?.images} />}
      />
      <ToastContainer />
    </div>
  );
}
