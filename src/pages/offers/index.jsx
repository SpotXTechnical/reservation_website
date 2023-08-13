import { useSelector } from "react-redux";
import { getOffers } from "../../app/Apis/OffersApis";
import { useEffect, useState } from "react";
import store, { langAction } from "../../store";
import { ShimmerThumbnail } from "react-shimmer-effects";
import PopularCard from "../../Components/SharedComponents/PopularCard/PopularCard";
import { getFavouriteList } from "../../app/Apis/UnitsApis";
import { FormattedMessage } from "react-intl";

export default function Offers() {
  let { lang } = useSelector((state) => state.language);
  const [data, setData] = useState(null);
  const [favourites, setFav] = useState([]);

  useEffect(() => {
    handleUpdateFavList();
  }, []);

  const handleUpdateFavList = () => {
    getFavouriteList().then((res) => setFav(res?.data));
  };
  useEffect(
    function () {
      getOffers().then((res) => {
        setData(res.data);
      });
    },
    [lang]
  );
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="wrapper">
      {!data ? (
        <div className="shimmer_wrapper">
          {" "}
          {[...Array(4)].map((e, i) => (
            <div className="shimmer" key={i}>
              <ShimmerThumbnail key={i} height={250} rounded />
            </div>
          ))}
        </div>
      ) : data?.length > 0 ? (
        <div className="units_container">
          {data?.map(({ unit }, i) => {
            return (
              <PopularCard
                key={i}
                id={unit.id}
                title={unit.title}
                image={unit.images[0]?.url}
                default_price={unit.default_price}
                bathrooms={unit.bathrooms}
                beds={unit.beds}
                type={unit.type}
                is_favourite={unit.is_favourite}
                active_ranges={unit.active_ranges}
                nearest_active_ranges={unit.nearest_active_ranges}
                updateFavList={handleUpdateFavList}
                favouritesList={favourites}
              />
            );
          })}
        </div>
      ) : (
        <p className="not_found">
          <FormattedMessage id="noDataFound" />
        </p>
      )}

      <style jsx>{`
        .wrapper {
          margin: 40px 100px;
          min-height: 50vh;
          padding: 0px;
        }
        .shimmer_wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 2%;
          margin-bottom: 150px;
        }

        .shimmer_wrapper > div {
          width: 48%;
          margin-bottom: 50px;
        }
        .not_found {
          text-align: center;
          margin-top: 100px;
        }

        .units_container {
          display: flex;
          flex-wrap: wrap;
          row-gap: 15px;
          column-gap: 48px;
        }

        @media screen and (max-width: 1280px) {
          .wrapper {
            margin: 16px;
          }
        }
      `}</style>
    </div>
  );
}
