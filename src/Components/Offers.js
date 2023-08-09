import { useSelector } from "react-redux";
import { getOffers } from "../app/Apis/OffersApis";
import { useEffect, useState } from "react";
import store, { langAction } from "../store";
import { ShimmerThumbnail } from "react-shimmer-effects";
import PopularCard from "../Components/SharedComponents/PopularCard/PopularCard";
import { getFavouriteList } from "../app/Apis/UnitsApis";
import { FormattedMessage } from "react-intl";

export default function Offers({styles}) {
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
    <div dir={lang === "ar" ? "rtl" : "ltr"} className={styles.container}>
      {!data ? (
        <div className={styles.shimmer_wrapper}>
          {" "}
          {[...Array(4)].map((e, i) => (
            <div className={styles.shimmer} key={i}>
              <ShimmerThumbnail key={i} height={250} rounded />
            </div>
          ))}
        </div>
      ) : data?.length > 0 ? (
        <div className={styles["units_container"]}>
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
        <p className={styles.not_found}>
          <FormattedMessage id="noDataFound" />
        </p>
      )}
    </div>
  );
}
