import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { getReservations } from "../../app/Apis/ReservationApis";
import ReservationCard from "../../Components//ReservationCard";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";
import ReservationsPagination from "../../Components/ReservationsPagination/ReservationsPagination";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";

const Reservations = () => {
  let { lang } = useSelector((state) => state.language);

  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }
  const [data, setData] = useState({});
  const [metaData, setMetaData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterState, setFilterState] = useState("upcoming");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getReservations();
        setData(res.data);
        setMetaData(res.meta);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lang]);

  const handleFilterChange = (val) => {
    setFilterState(val);
    getReservations(val).then((res) => {
      setData(res.data);
    });
  };

  const getPageNumberAndFetch = async (pageNumber) => {
    try {
      setData({});
      setLoading(true);
      const response = await getReservations(`page=${pageNumber}`);
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Reservations | SpotX</title>
        <meta name="description" content={"All reservations in SpotX"} />
      </Head>
      <div
        className="tw-min-h-screen tw-bg-gray-50 tw-p-4 sm:tw-p-6 lg:tw-p-8"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="tw-max-w-6xl tw-mx-auto">
          {/* Page Header */}
          <h2 className="tw-text-2xl sm:tw-text-3xl lg:tw-text-4xl tw-font-bold tw-text-gray-800 tw-mb-6 sm:tw-mb-8">
            <FormattedMessage id="reservations" />
          </h2>

          {/* Filter Buttons */}
          <div className="tw-flex tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-1 tw-mb-6 sm:tw-mb-8 tw-max-w-md">
            <button
              className={`tw-flex-1 tw-py-2 tw-px-4 tw-text-sm sm:tw-text-base tw-font-medium tw-rounded-md tw-transition-all tw-duration-200 tw-cursor-pointer
                ${
                  filterState === "upcoming"
                    ? "tw-bg-[#44bcb7] tw-text-white tw-shadow-sm"
                    : "tw-text-gray-600 hover:tw-text-gray-800 hover:tw-bg-gray-50"
                }`}
              onClick={() => handleFilterChange("upcoming")}
            >
              <FormattedMessage id="current" />
            </button>
            <button
              className={`tw-flex-1 tw-py-2 tw-px-4 tw-text-sm sm:tw-text-base tw-font-medium tw-rounded-md tw-transition-all tw-duration-200 tw-cursor-pointer
                ${
                  filterState === "past"
                    ? "tw-bg-[#44bcb7] tw-text-white tw-shadow-sm"
                    : "tw-text-gray-600 hover:tw-text-gray-800 hover:tw-bg-gray-50"
                }`}
              onClick={() => handleFilterChange("past")}
            >
              <FormattedMessage id="past" />
            </button>
          </div>

          {/* Content Area */}
          <div
            className={`${
              Object.keys(data).length !== 0
                ? "tw-space-y-4 sm:tw-space-y-6"
                : "tw-flex tw-items-center tw-justify-center tw-min-h-96"
            }`}
          >
            {/* Loading State */}
            {loading && Object.keys(data).length === 0 && (
              <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-4">
                <div className="tw-animate-spin tw-rounded-full tw-h-12 tw-w-12 tw-border-b-2 tw-border-[#44bcb7]"></div>
                <span className="tw-text-gray-600 tw-text-sm sm:tw-text-base">
                  Loading...
                </span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-lg tw-p-4 sm:tw-p-6 tw-text-center">
                <p className="tw-text-red-700 tw-text-sm sm:tw-text-base">
                  <FormattedMessage id={error} />
                </p>
              </div>
            )}

            {/* Reservations List */}
            {Object.keys(data).length !== 0 &&
              data.map((item, i) => {
                return <ReservationCard data={item} key={item.id} />;
              })}
          </div>

          {/* Pagination */}
          {metaData && (
            <div className="tw-mt-8 sm:tw-mt-12">
              <ReservationsPagination
                lastPage={metaData?.last_page}
                callBack={getPageNumberAndFetch}
              />
            </div>
          )}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Reservations;
