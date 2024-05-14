"use client";
import { getMostPopularProperties } from "../../app/Apis/HomeApis";
import { useEffect, useState } from "react";
import PopularCard from "../SharedComponents/PopularCard/PopularCard";
import Title from "../SharedComponents/Title/Title";
import ViewAll from "../SharedComponents/ViewAll/ViewAll";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { getFavouriteList } from "../../app/Apis/UnitsApis";
import { useRouter } from "next/router";
import Link from "next/link";

const MostPopularList = ({ unitsData }) => {
  const intl = useIntl();
  const router = useRouter();
  // const [data, setData] = useState([]);
  const [favourites, setFav] = useState([]);
  let { lang } = useSelector((state) => state.language);
  let sizeLimitedData = null;
  // useEffect(() => {
  //   getMostPopularProperties().then((res) => setData(res.data?.slice(0, 4)));
  // }, [lang]);
  useEffect(() => {
    getFavouriteList().then((res) => setFav(res?.data));
  }, []);

  const handleUpdateFavList = () => {
    getFavouriteList().then((res) => setFav(res?.data));
  };

  return (
    <div className="popularList_container">
      <div className="popularList_header">
        <Title text={unitsData.title} />
        {/* <ViewAll handleClick={handleViewAll} /> */}
        <Link href={`show-all/${unitsData.id}`} className="view_all">
          Show All
        </Link>
      </div>
      <div className="popularList">
        {unitsData.sectionData?.length > 0 && unitsData.sectionData.length < 4
          ? unitsData.sectionData.map(
              ({
                images,
                title,
                type,
                bathrooms,
                beds,
                is_favourite,
                active_ranges,
                nearest_active_ranges,
                id,
                total_price,
                current_price,
              }) => (
                <PopularCard
                  id={id}
                  key={id}
                  title={title}
                  image={images[0]?.url}
                  bathrooms={bathrooms}
                  beds={beds}
                  type={type}
                  is_favourite={is_favourite}
                  active_ranges={active_ranges}
                  nearest_active_ranges={nearest_active_ranges}
                  favouritesList={favourites}
                  updateFavList={handleUpdateFavList}
                  total_price={total_price}
                  current_price={current_price}
                />
              )
            )
          : unitsData.sectionData
              .slice(0, 4)
              .map(
                (
                  {
                    images,
                    title,
                    type,
                    bathrooms,
                    beds,
                    is_favourite,
                    active_ranges,
                    nearest_active_ranges,
                    id,
                    total_price,
                    current_price,
                  },
                  i
                ) => (
                  <PopularCard
                    id={id}
                    key={id}
                    title={title}
                    image={images[0]?.url}
                    bathrooms={bathrooms}
                    beds={beds}
                    type={type}
                    is_favourite={is_favourite}
                    active_ranges={active_ranges}
                    nearest_active_ranges={nearest_active_ranges}
                    favouritesList={favourites}
                    updateFavList={handleUpdateFavList}
                    total_price={total_price}
                    current_price={current_price}
                  />
                )
              )}
      </div>
    </div>
  );
};

export default MostPopularList;
