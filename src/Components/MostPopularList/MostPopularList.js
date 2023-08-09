"use client";
import { getMostPopularProperties } from "../../app/Apis/HomeApis";
import { useEffect, useState } from "react";
import PopularCard from "../SharedComponents/PopularCard/PopularCard";
import Title from "../SharedComponents/Title/Title";
import ViewAll from "../SharedComponents/ViewAll/ViewAll";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { useIntl } from "react-intl";
import styles from "./MostPopularList.module.css";
import { useSelector } from "react-redux";
import { getFavouriteList } from "../../app/Apis/UnitsApis";

const MostPopularList = () => {
  const intl = useIntl();
  const [data, setData] = useState([]);
  const [favourites, setFav] = useState([]);
  let { lang } = useSelector((state) => state.language);
  useEffect(() => {
    getMostPopularProperties().then((res) => setData(res.data?.slice(0, 4)));
  }, [lang]);
  useEffect(() => {
    getFavouriteList().then((res) => setFav(res?.data));
  }, []);
  const handleViewAll = () => {};
  const handleUpdateFavList = () => {
    getFavouriteList().then((res) => setFav(res?.data));
  };
  return (
    <div className={styles.popularList_container}>
      <div className={styles.popularList_header}>
        <Title
          text={intl.formatMessage({ id: "home.mostPopularProperties" })}
        />
        <ViewAll handleClick={handleViewAll} />
      </div>
      <div className={styles.popularList}>
        {data?.length > 0
          ? data.map(
              (
                {
                  images,
                  title,
                  type,
                  bathrooms,
                  beds,
                  default_price,
                  is_favourite,
                  active_ranges,
                  nearest_active_ranges,
                  id,
                },
                i
              ) => (
                <PopularCard
                  id={id}
                  key={i}
                  title={title}
                  image={images[0]?.url}
                  default_price={default_price}
                  bathrooms={bathrooms}
                  beds={beds}
                  type={type}
                  is_favourite={is_favourite}
                  active_ranges={active_ranges}
                  nearest_active_ranges={nearest_active_ranges}
                  favouritesList={favourites}
                  updateFavList={handleUpdateFavList}
                />
              )
            )
          : [...Array(4)].map((e, i) => (
              <ShimmerThumbnail key={i} height={250} rounded />
            ))}
      </div>
    </div>
  );
};

export default MostPopularList;
