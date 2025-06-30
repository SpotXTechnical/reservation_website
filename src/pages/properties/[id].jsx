import { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Breadcrumb from "../../Components/BreadCrumb";
import {
  getHotelRoomReservationDetails,
  getPropertyDetails,
  getPropertyReservationDetails,
  getSummary,
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
import RulesDisplay from "../../Components/RuleDisplay";
import RulesBanner from "../../Components/RulesBanner";
import OffersBanner from "../../Components/OffersBanner";
import OffersDisplay from "../../Components/OffersDisplay";

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
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);

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
        getPropertyDetails(id)
          .then((res) => {
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
          })
          .catch((error) => {
            console.error("Error fetching property details:", error);
            if (error.response?.status === 404) {
              router.push("/404");
            }
          });
      }
    },
    [id, lang]
  );

  useEffect(() => {
    if (showHotelCalendar) {
      document.getElementById("app-hotel-calendar").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showHotelCalendar]);

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

  const handleGuestMealsChange = useCallback(() => {
    setShowHotelCalendar(false);
  }, []);

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
    setSummaryModalLoading(true);
    reserveUnit(formData).then((res) => {
      setSummaryModalLoading(false);
      setIsOpen(false);
      if (res) {
        router.push("/reservations");
      }
    });
  };

  const onShowSummary = (
    startDate,
    endDate,
    isOffer = false,
    offerId = null,
    offerSummaryData = null
  ) => {
    const summaryHotelData = new FormData();
    if (!isOffer) {
      summaryHotelData.append("from", moment(startDate).format("YYYY-MM-DD"));
      summaryHotelData.append("to", moment(endDate).format("YYYY-MM-DD"));
    }
    if (isOffer && data.type === "hotel") {
      summaryHotelData.append("range_id", offerId);
      summaryHotelData.append(
        "meal_id",
        offerSummaryData?.modifiedSelectedMeal?.id
      );
      summaryHotelData.append("adults", offerSummaryData?.adults);
      offerSummaryData?.childrenFormRanges?.forEach((child) => {
        summaryHotelData.append("children[]", child);
      });
      setSummaryData(offerSummaryData);
    }

    if (isOffer && data.type !== "hotel") {
      summaryHotelData.append("range_id", offerId);
    }

    summaryHotelData.append("unit_id", id);
    summaryHotelData.append("unit_type", data.type);

    if (data.type === "hotel" && !isOffer) {
      summaryHotelData.append("meal_id", summaryData?.modifiedSelectedMeal?.id);
      summaryHotelData.append("adults", summaryData?.adults);
      summaryData?.childrenFormRanges?.forEach((child) => {
        summaryHotelData.append("children[]", child);
      });
    }
    setIsOpen(true);
    setSummaryModalLoading(true);
    getSummary(summaryHotelData)
      .then((res) => {
        setSummaryModalLoading(false);
        handleShowReservationModal(res?.data);
      })
      .catch((error) => {
        setSummaryModalLoading(false);
        setIsOpen(false);
      });
  };
  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="tw-w-full tw-max-w-7xl tw-mx-auto tw-px-3 sm:tw-px-4 lg:tw-px-6 tw-py-4"
    >
      <Head>
        <title>{data?.title || "Loading..."}</title>
        <meta name="description" content={data?.description} />
      </Head>

      {/* Header Section - Improved mobile layout */}
      <div className="tw-flex tw-flex-col lg:tw-flex-row tw-justify-between tw-items-start lg:tw-items-center tw-gap-3 tw-mb-4 tw-border-b tw-border-gray-100 tw-pb-3">
        {/* Breadcrumb */}
        <div className="tw-flex-shrink-0 tw-w-full lg:tw-w-auto">
          <Breadcrumb items={items} />
        </div>

        {/* Actions - Better mobile stacking */}
        <div className="tw-flex tw-items-center tw-flex-wrap tw-gap-2 tw-w-full lg:tw-w-auto tw-justify-start lg:tw-justify-end lg:tw-ml-auto">
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
                className="tw-w-5 tw-h-5 tw-fill-gray-400"
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
              <span className="tw-text-sm tw-font-medium tw-text-[#44bcb7]">
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
                className="tw-w-4 tw-h-4 tw-opacity-70 tw-transition-transform tw-duration-300 hover:tw-scale-110"
              />
            )}
            <span
              className={`tw-text-sm tw-font-medium ${
                isCopied ? "tw-text-[#44bcb7]" : "tw-text-[#a2a2a2]"
              }`}
            >
              {isCopied ? (
                <span className="tw-flex tw-items-center tw-gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tw-h-4 tw-w-4"
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
        <div className="tw-w-full tw-flex tw-flex-col sm:tw-flex-row tw-items-start sm:tw-items-center tw-justify-between tw-gap-3 tw-py-3 tw-mb-4">
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
          className="tw-w-full tw-cursor-pointer tw-mb-4"
          onClick={handleImageGallery}
        >
          {/* Main Feature Image */}
          <div className="tw-w-full tw-overflow-hidden tw-rounded-xl tw-mb-2 tw-shadow-sm tw-bg-gray-100">
            {data?.images[0]?.type === "image" ? (
              <img
                src={data?.images[0]?.url}
                alt="Feature image"
                className="tw-w-full tw-h-60 sm:tw-h-80 lg:tw-h-96 tw-object-cover tw-transition-transform tw-duration-500 hover:tw-scale-105"
              />
            ) : (
              <video
                src={data?.images[0]?.url}
                controls={true}
                className="tw-w-full tw-h-60 sm:tw-h-80 lg:tw-h-96 tw-object-cover"
              ></video>
            )}
          </div>

          {/* Thumbnail Gallery - Responsive grid */}
          <div className="tw-grid tw-grid-cols-3 tw-gap-2">
            {data.images.slice(1, 4).map(
              (image, index) =>
                image.url && (
                  <div
                    key={index}
                    className={`tw-relative tw-overflow-hidden tw-rounded-lg tw-shadow-sm ${
                      index === 2 ? "tw-overlay-container" : ""
                    }`}
                  >
                    <div className="tw-h-20 sm:tw-h-24 lg:tw-h-32">
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
                          <p className="tw-text-white tw-font-semibold tw-text-lg">
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
          <div className="tw-grid tw-grid-cols-3 tw-gap-2 tw-mt-2">
            {[...Array(3)].map((_, i) => (
              <ShimmerThumbnail key={i} height={150} rounded />
            ))}
          </div>
        </div>
      )}

      {/* Main Content Grid - Better responsive breakpoints */}
      <div className="tw-container tw-mx-auto tw-px-0 tw-py-4 tw-max-w-7xl">
        <div className="tw-grid tw-grid-cols-1 tw-gap-4 lg:tw-gap-6 xl:tw-grid-cols-2">
          {/* Left Column - Property Details */}
          <div className="tw-space-y-4">
            {/* Property Specs & Price Card - Improved mobile layout */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-overflow-hidden tw-border tw-border-gray-50">
              <div className="tw-flex tw-flex-col lg:tw-flex-row tw-justify-between tw-items-start lg:tw-items-center tw-p-6 tw-gap-4">
                <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-6 tw-flex-1">
                  {/* Bedrooms */}
                  <div className="tw-flex tw-items-center tw-gap-3">
                    <div className="tw-bg-gradient-to-br  tw-from-[#c3f5f3] tw-to-[#b8f4f1] tw-p-3 tw-rounded-xl tw-shadow-sm">
                      <svg
                        className="tw-w-6 tw-h-6"
                        viewBox="0 0 16 16"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#000"
                          d="M4.28 7h2.72l-1.15-1.68c-0.542-0.725-1.36-1.216-2.295-1.319l-0.555-0.001v1.54c-0.011 0.063-0.018 0.136-0.018 0.211 0 0.69 0.56 1.25 1.25 1.25 0.017 0 0.034-0 0.050-0.001z"
                        ></path>
                        <path
                          fill="#000"
                          d="M13 7v-0.28c0-0.003 0-0.007 0-0.010 0-0.934-0.749-1.693-1.678-1.71l-4.692-0c0.5 0.62 1.37 2 1.37 2h5z"
                        ></path>
                        <path
                          fill="#000"
                          d="M15 5.1c-0.552 0-1 0.448-1 1v1.9h-12v-4c0-0.552-0.448-1-1-1s-1 0.448-1 1v9h2v-2h12v2h2v-6.9c0-0.552-0.448-1-1-1z"
                        ></path>
                      </svg>
                    </div>
                    <div className="tw-flex tw-flex-col">
                      <span className="tw-text-gray-500 tw-text-sm tw-font-medium tw-mb-1">
                        <FormattedMessage id="bedroom" />
                      </span>
                      <span className="tw-font-bold tw-text-lg tw-text-gray-900">
                        {data?.bed_rooms}
                      </span>
                    </div>
                  </div>

                  {/* Bathrooms */}
                  <div className="tw-flex tw-items-center tw-gap-3">
                    <div className="tw-bg-gradient-to-br tw-from-[#c3f5f3] tw-to-[#b8f4f1] tw-p-3 tw-rounded-xl tw-shadow-sm">
                      <svg
                        className="tw-w-6 tw-h-6"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 3.5C2 2.11929 3.11929 1 4.5 1H6V2H7V0H4.5C2.567 0 1 1.567 1 3.5V7H0V8H1V9.5C1 11.2632 2.30385 12.7219 4 12.9646V15H5V13H10V15H11V12.9646C12.6961 12.7219 14 11.2632 14 9.5V8H15V7H2V3.5Z"
                          fill="#000000"
                        />
                        <path d="M8 4H5V3H8V4Z" fill="#000000" />
                      </svg>
                    </div>
                    <div className="tw-flex tw-flex-col">
                      <span className="tw-text-gray-500 tw-text-sm tw-font-medium tw-mb-1">
                        <FormattedMessage id="bathroom" />
                      </span>
                      <span className="tw-font-bold tw-text-lg tw-text-gray-900">
                        {data?.bathrooms}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="tw-flex tw-items-center tw-justify-end lg:tw-justify-end tw-w-full lg:tw-w-auto">
                  <div className="tw-bg-gradient-to-r tw-from-[#44bcb7] tw-to-[#3da8a3] tw-text-white tw-px-5 tw-py-2 tw-rounded-xl tw-shadow-lg tw-border tw-border-[#3da8a3]/20 tw-relative tw-overflow-hidden">
                    {/* Background decoration */}
                    <div className="tw-absolute tw-top-0 tw-right-0 tw-w-8 tw-h-8 tw-bg-white/10 tw-rounded-full tw-transform tw-translate-x-2 tw--translate-y-2"></div>
                    <div className="tw-absolute tw-bottom-0 tw-left-0 tw-w-6 tw-h-6 tw-bg-white/5 tw-rounded-full tw-transform tw--translate-x-1 tw-translate-y-1"></div>

                    <div className="tw-relative tw-flex tw-items-baseline tw-gap-1">
                      <span className="tw-text-2xl tw-font-bold tw-text-white">
                        {data?.current_price}
                      </span>
                      <span className="tw-text-emerald-100 tw-font-medium">
                        <FormattedMessage id="le" />
                      </span>
                      <span className="tw-text-sm tw-text-emerald-100/80 tw-font-medium">
                        / <FormattedMessage id="day" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4">
              <h2 className="tw-text-xl tw-font-bold tw-mb-3 tw-text-gray-800">
                <FormattedMessage id="overview" />
              </h2>

              {data && Object.keys(data).length > 0 ? (
                <>
                  <h3 className="tw-text-lg tw-font-semibold tw-mb-2 tw-text-gray-700">
                    {data?.title}
                  </h3>
                  <p className="tw-text-sm tw-text-gray-600 tw-leading-relaxed">
                    {data?.description}
                  </p>
                </>
              ) : (
                <>
                  <ShimmerThumbnail height={25} rounded />
                  <div className="tw-mt-3">
                    <ShimmerThumbnail height={80} rounded />
                  </div>
                </>
              )}
            </div>

            {/* Features Section - Improved responsive grid */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4">
              <h2 className="tw-text-xl tw-font-bold tw-mb-4 tw-text-gray-800">
                <FormattedMessage
                  id="moreFeatures"
                  defaultMessage="moreFeatures"
                />
              </h2>

              <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-4">
                {data?.features?.length > 0
                  ? data.features?.map((feature, i) => (
                      <div
                        key={i}
                        className="tw-flex tw-flex-col tw-items-center tw-text-center"
                      >
                        <div className="tw-bg-[#44bcb7] tw-rounded-full tw-p-3 tw-mb-2">
                          <img
                            width="24px"
                            height="24px"
                            src={feature.url}
                            key={feature.id}
                            alt={feature.name}
                            className="tw-w-6 tw-h-6"
                          />
                        </div>
                        <p className="tw-text-xs tw-text-gray-700 tw-leading-tight">
                          {feature.name}
                        </p>
                      </div>
                    ))
                  : [...Array(3)].map((e, i) => (
                      <ShimmerThumbnail key={i} height={150} rounded />
                    ))}
              </div>
            </div>
            {/* Offers */}
            {Object.keys(data).length > 0 && data.has_offers && (
              <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4">
                <OffersBanner onClick={() => setIsOffersModalOpen(true)} />
                <ModalComponent
                  modalBody={
                    <OffersDisplay
                      unitType={data?.type}
                      ageRanges={data?.age_policies}
                      mealsOptions={data?.meals}
                      adultsNumber={data?.adults_number}
                      maxAdultsNumber={data?.max_adults_number}
                      freeChildrenNumber={data?.free_children_number}
                      maxChildrenNumber={data?.max_children_number}
                      onRedeemOffer={onShowSummary}
                      onCloseOffersModal={() => setIsOffersModalOpen(false)}
                    />
                  }
                  isOpen={isOffersModalOpen}
                  toggleModal={() => setIsOffersModalOpen(!isOffersModalOpen)}
                />
              </div>
            )}

            {/* Rules */}
            {Object.keys(data).length > 0 && (
              <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4">
                <RulesBanner onClick={() => setIsRulesModalOpen(true)} />
                <ModalComponent
                  modalBody={
                    <RulesDisplay
                      rules={data?.rules}
                      onGotIt={() => setIsRulesModalOpen(false)}
                    />
                  }
                  isOpen={isRulesModalOpen}
                  toggleModal={() => setIsRulesModalOpen(!isRulesModalOpen)}
                />
              </div>
            )}

            {/* Cancellation Policy */}
            {Object.keys(data).length > 0 &&
              data.cancelation_policy?.details?.description && (
                <div className="tw-bg-gradient-to-br tw-from-white tw-to-gray-50 tw-rounded-2xl tw-shadow-[0px_4px_20px_rgba(0,_0,_0,_0.08)] tw-border tw-border-gray-100 tw-p-6 tw-transition-all tw-duration-300 hover:tw-shadow-[0px_8px_30px_rgba(0,_0,_0,_0.12)] ">
                  {/* Header with icon */}
                  <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
                    <h2 className="tw-text-xl tw-font-bold tw-text-gray-800 tw-leading-tight">
                      <FormattedMessage id="Cancellation Policy" />
                    </h2>
                  </div>

                  {/* Content section */}
                  <div className="tw-space-y-4">
                    {/* Policy title */}
                    <div className="tw-flex tw-items-center tw-gap-3">
                      <div className="tw-bg-blue-50 tw-p-1.5 tw-rounded-lg tw-mt-0.5 tw-flex tw-items-center tw-justify-center">
                        <svg
                          className="tw-w-4 tw-h-4 tw-text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4m2 0h-10m10 0h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1m6 0V5H10v2"
                          />
                        </svg>
                      </div>
                      <p className="tw-text-base tw-font-semibold tw-text-gray-800 tw-leading-relaxed">
                        {data?.cancelation_policy?.details?.title}
                      </p>
                    </div>

                    {/* Policy description */}
                    <div className="tw-flex tw-items-center tw-gap-3">
                      <div className="tw-bg-amber-50 tw-p-1.5 tw-rounded-lg tw-mt-0.5 tw-flex tw-items-center tw-justify-center">
                        <svg
                          className="tw-w-4 tw-h-4 tw-text-amber-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="tw-text-sm tw-text-gray-600 tw-leading-relaxed tw-font-medium">
                        {data?.cancelation_policy?.details?.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="tw-mt-5 tw-h-1 tw-bg-gradient-to-r tw-from-[#44bcb7] tw-via-blue-200 tw-to-[#6cded9] tw-rounded-full tw-opacity-60"></div>
                </div>
              )}

            {Object.keys(data).length > 0 &&
              !data.cancelation_policy?.details?.description && (
                <div className="tw-bg-gradient-to-br tw-from-gray-50 tw-to-gray-100 tw-rounded-2xl tw-shadow-[0px_4px_20px_rgba(0,_0,_0,_0.05)] tw-border tw-border-gray-200 tw-p-8 tw-text-center">
                  {/* Empty state icon */}
                  <div className="tw-mx-auto tw-mb-4 tw-bg-gray-100 tw-p-4 tw-rounded-full tw-w-16 tw-h-16 tw-flex tw-items-center tw-justify-center">
                    <svg
                      className="tw-w-8 tw-h-8 tw-text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  {/* Empty state text */}
                  <h3 className="tw-text-lg tw-font-semibold tw-text-gray-700 tw-mb-2">
                    <FormattedMessage id="Cancellation Policy" />
                  </h3>
                  <p className="tw-text-sm tw-text-gray-500 tw-leading-relaxed tw-max-w-xs tw-mx-auto">
                    No cancellation policy information is currently available
                    for this property.
                  </p>

                  {/* Subtle decoration */}
                  <div className="tw-mt-6 tw-flex tw-justify-center tw-space-x-1">
                    <div className="tw-w-2 tw-h-2 tw-bg-gray-300 tw-rounded-full tw-opacity-50"></div>
                    <div className="tw-w-2 tw-h-2 tw-bg-gray-300 tw-rounded-full tw-opacity-30"></div>
                    <div className="tw-w-2 tw-h-2 tw-bg-gray-300 tw-rounded-full tw-opacity-10"></div>
                  </div>
                </div>
              )}

            {/* Property Owner */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4">
              <h2 className="tw-text-xl tw-font-bold tw-mb-3 tw-text-gray-800">
                <FormattedMessage id="Property Owner" />
              </h2>

              {data?.owner?.name ? (
                <div
                  className="tw-flex tw-items-center tw-cursor-pointer tw-bg-gray-50 tw-p-3 tw-rounded-lg hover:tw-bg-gray-100"
                  onClick={() => handleRedirectToOwnerProfile(data?.owner?.id)}
                >
                  <img
                    src={data?.owner?.image}
                    alt="owner_img"
                    className="tw-w-12 tw-h-12 tw-rounded-full tw-object-cover tw-border-2 tw-border-blue-300"
                  />
                  <p className="tw-ml-3 tw-font-medium tw-text-base">
                    {data?.owner?.name}
                  </p>
                </div>
              ) : (
                <ShimmerThumbnail height={100} rounded />
              )}
            </div>

            {/* FAQ Section */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4">
              <h3 className="tw-text-xl tw-font-bold tw-mb-4 tw-text-gray-800">
                FAQs
              </h3>

              {faqs && faqs.length > 0 ? (
                <div className="tw-divide-y tw-divide-gray-200">
                  {faqs.map((faq) => (
                    <div className="tw-py-3" key={faq.id}>
                      <div className="tw-accordion-item">
                        <h2 className="tw-accordion-header">
                          <button
                            className="tw-w-full tw-flex tw-justify-between tw-items-center tw-text-left tw-font-medium tw-text-gray-800 tw-p-3 tw-rounded-lg tw-bg-gray-50 hover:tw-bg-gray-100 tw-text-sm"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${faq.id}`}
                            aria-expanded="false"
                            aria-controls={`collapse${faq.id}`}
                          >
                            {faq.question}
                            <svg
                              className="tw-h-4 tw-w-4 tw-text-gray-500 tw-flex-shrink-0 tw-ml-2"
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
                          <div className="tw-p-3 tw-bg-white tw-rounded-lg tw-mt-2 tw-text-gray-600 tw-text-sm">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-text-center">
                  <span className="tw-inline-block tw-px-3 tw-py-2 tw-bg-gray-200 tw-text-gray-700 tw-rounded-full tw-text-sm">
                    There&apos;s no FAQs for this unit.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Availability & Map */}
          <div className="tw-space-y-4">
            {/* Availability Calendar */}
            {Object.keys(reservationData).length > 0 &&
              data?.type !== "hotel" && (
                <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4">
                  <div className="tw-flex tw-items-center tw-mb-4">
                    <div className="tw-bg-blue-50 tw-p-2 tw-rounded-full">
                      <img
                        src="/assets/availability.png"
                        alt="availability-icon"
                        className="tw-h-5 tw-w-5"
                      />
                    </div>
                    <h2 className="tw-text-xl tw-font-bold tw-ml-3 tw-text-gray-800">
                      <FormattedMessage id="Avaliability" />
                    </h2>
                  </div>

                  <div className="tw-bg-gray-50 tw-p-3 tw-rounded-lg">
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

            {/* Hotel Guest Meals Selector */}
            {data.type === "hotel" && (
              <>
                <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4">
                  <GuestMealsSelector
                    ageRanges={data?.age_policies}
                    mealsOptions={data?.meals}
                    adultsNumber={data?.adults_number}
                    maxAdultsNumber={data?.max_adults_number}
                    freeChildrenNumber={data?.free_children_number}
                    maxChildrenNumber={data?.max_children_number}
                    onSelectGuestMeals={handleGuestMealsSelection}
                    onGuestMealsChange={handleGuestMealsChange}
                  />
                </div>

                {showHotelCalendar && (
                  <div
                    className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4"
                    id="app-hotel-calendar"
                  >
                    <div className="tw-flex tw-items-center tw-mb-4">
                      <div className="tw-bg-blue-50 tw-p-2 tw-rounded-full">
                        <img
                          src="/assets/availability.png"
                          alt="availability-icon"
                          className="tw-h-5 tw-w-5"
                        />
                      </div>
                      <h2 className="tw-text-xl tw-font-bold tw-ml-3 tw-text-gray-800">
                        <FormattedMessage id="Avaliability" />
                      </h2>
                    </div>

                    <div className="tw-bg-gray-50 tw-p-0 md:tw-p-3 tw-rounded-lg">
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
                            onShowSummary={onShowSummary}
                          />
                        )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Map Section */}
            {mapPosition && (
              <div className="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-p-4 tw-z-10">
                <h2 className="tw-text-xl tw-font-bold tw-mb-4 tw-text-gray-800">
                  <FormattedMessage id="Location" />
                </h2>

                <div className="tw-rounded-lg tw-overflow-hidden tw-h-60 lg:tw-h-80">
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
      <div className="tw-w-full tw-py-4 tw-px-0">
        {data?.reviews?.length > 0 && (
          <h3 className="tw-text-xl tw-font-bold tw-mb-4 tw-text-gray-800 tw-text-center sm:tw-text-left">
            <FormattedMessage id="Reviews" />
          </h3>
        )}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-3 tw-max-w-7xl tw-mx-auto">
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
            loading={summaryModalLoading}
          />
        }
      />

      <ModalComponent
        isOpen={isGalleryModalOpen}
        toggleModal={toggleGalleryModal}
        className="mx-auto p-0 p-md-3"
        modalBody={<PropertyCarousel images={data?.images} />}
      />
      <ToastContainer />
    </div>
  );
}
