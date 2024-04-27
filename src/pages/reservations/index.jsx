import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { getReservations } from "../../app/Apis/ReservationApis";
import ReservationCard from "../../Components//ReservationCard";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";
import ReservationsPagination from "../../Components/ReservationsPagination/ReservationsPagination";

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
    <div
      className="reservation_container list"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <h2 className="mb-3">
        <FormattedMessage id="reservations" />
      </h2>

      <div className={`d-flex filter_btns mb-3`}>
        <p
          className={`m-0 text-center cursor-pointer ${
            filterState == "upcoming" && "active"
          }`}
          onClick={() => handleFilterChange("upcoming")}
        >
          <FormattedMessage id="current" />
        </p>
        <p
          className={`m-0 text-center cursor-pointer ${
            filterState == "past" && "active"
          }`}
          onClick={() => handleFilterChange("past")}
        >
          <FormattedMessage id="past" />
        </p>
      </div>

      <div
        className={`${
          Object.keys(data).length !== 0 ? "reservations" : "loader_container"
        }`}
      >
        {loading && Object.keys(data).length === 0 && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {error && <FormattedMessage id={error} />}

        {Object.keys(data).length !== 0 &&
          data.map((item, i) => {
            return <ReservationCard data={item} key={item.id} />;
          })}
      </div>
      {/* Pagination */}
      {metaData && (
        <ReservationsPagination
          lastPage={metaData?.last_page}
          callBack={getPageNumberAndFetch}
        />
      )}
    </div>
  );
};

export default Reservations;
