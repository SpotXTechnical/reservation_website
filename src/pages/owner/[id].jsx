import { FormattedMessage } from "react-intl";
import { getOwnerDetails } from "../../app/Apis/OwnerApis";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ShimmerThumbnail } from "react-shimmer-effects";
import store, { langAction } from "../../store";
import PopularCard from "../../Components/SharedComponents/PopularCard/PopularCard";
import { getFavouriteList } from "../../app/Apis/UnitsApis";

export default function OwnerProfile() {
  const router = useRouter();
  const { id } = router.query;
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
      if (id) {
        getOwnerDetails(id).then((res) => {
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

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="owner_container">
      <div className="over_view">
        {data?.name ? (
          <div className="owner">
            <img src={data?.image} alt="owner_img" />
            <p>{data?.name} </p>
            <p>{data?.phone} </p>
          </div>
        ) : (
          <ShimmerThumbnail height={175} rounded />
        )}
      </div>
      <div className="title">
        <p>
          <FormattedMessage id="Other units" />
        </p>
      </div>
      {!data ? (
        <div className="shimmer_wrapper">
          {" "}
          {[...Array(4)].map((e, i) => (
            <div className="shimmer" key={i}>
              <ShimmerThumbnail key={i} height={250} rounded />
            </div>
          ))}
        </div>
      ) : data?.units?.length > 0 ? (
        <div className="units_container">
          {data?.units.map((unit, i) => {
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
    </div>
  );
}
