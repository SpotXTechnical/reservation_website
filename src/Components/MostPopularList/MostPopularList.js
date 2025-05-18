"use client";
import { useEffect, useState } from "react";
import PopularCard from "../SharedComponents/PopularCard/PopularCard";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { getFavouriteList } from "../../app/Apis/UnitsApis";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import Title from "../SharedComponents/Title/Title";

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
    <div className="tw-w-full tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-6 tw-my-16">
      {/* Header with gradient underline animation */}
      <div className="tw-flex tw-flex-col tw-gap-4 tw-mb-10 sm:tw-flex-row sm:tw-justify-between sm:tw-items-center">
        <Title text={unitsData.title} />
        <Link
          href={`show-all/${unitsData.id}`}
          className="tw-group tw-flex tw-items-center tw-justify-center tw-text-[#44bcb7] tw-font-semibold tw-px-4 tw-py-2 tw-rounded-full tw-border tw-border-[#44bcb7] hover:tw-border-[#44bcb7] tw-bg-white hover:tw-bg-[#44bcb7] hover:tw-text-[#fff] tw-shadow-sm tw-transition-all tw-duration-300 tw-ease-in-out tw-w-full sm:tw-w-auto"
        >
          <span>{intl.formatMessage({ id: "showMore" })}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="tw-h-5 tw-w-5 tw-ml-2 tw-transition-transform tw-duration-300 tw-ease-in-out tw-transform tw-group-hover:tw-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>

      {/* Card grid with improved spacing and responsiveness */}
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 md:tw-gap-8">
        {unitsData.sectionData?.length > 0 && unitsData.sectionData.length < 4
          ? unitsData.sectionData.map(
              ({
                images,
                main_image,
                title,
                klass,
                bathrooms,
                bed_rooms,
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
                  image={main_image?.url || images[0]?.url}
                  bathrooms={bathrooms}
                  bed_rooms={bed_rooms}
                  klass={klass}
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
                ({
                  images,
                  main_image,
                  title,
                  klass,
                  bathrooms,
                  bed_rooms,
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
                    image={main_image?.url || images[0]?.url}
                    bathrooms={bathrooms}
                    bed_rooms={bed_rooms}
                    klass={klass}
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
      <ToastContainer />
    </div>
  );
};

export default MostPopularList;
