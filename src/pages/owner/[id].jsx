import { FormattedMessage } from "react-intl";
import { getOwnerDetails } from "../../app/Apis/OwnerApis";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ShimmerThumbnail } from "react-shimmer-effects";
import store, { langAction } from "../../store";
import PopularCard from "../../Components/SharedComponents/PopularCard/PopularCard";
import { getFavouriteList } from "../../app/Apis/UnitsApis";
import Head from "next/head";

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
    <>
      <Head>
        <title>{data?.name || "Loading"} | SpotX</title>
        <meta name="description" content={"Owner"} />
      </Head>

      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="tw-min-h-screen tw-bg-gray-50 tw-py-6 tw-px-4 sm:tw-px-6 lg:tw-px-8"
      >
        <div className="tw-max-w-7xl tw-mx-auto">
          {/* Owner Profile Section */}
          <div className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-4 sm:tw-p-6 tw-mb-8">
            {data?.name ? (
              <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-4">
                <div className="tw-relative">
                  <img
                    src={data?.image}
                    alt="owner_img"
                    className="tw-w-24 tw-h-24 sm:tw-w-32 sm:tw-h-32 tw-rounded-full tw-object-cover tw-border-4 tw-border-blue-100 tw-shadow-md"
                  />
                  <div className="tw-absolute tw-bottom-0 tw-right-0 tw-w-6 tw-h-6 tw-bg-green-500 tw-rounded-full tw-border-2 tw-border-white"></div>
                </div>
                <div className="tw-text-center sm:tw-text-left">
                  <h1 className="tw-text-2xl sm:tw-text-3xl tw-font-bold tw-text-gray-900 tw-mb-2">
                    {data?.name}
                  </h1>
                  <div className="tw-flex tw-items-center tw-justify-center sm:tw-justify-start tw-gap-2 tw-text-gray-600">
                    <svg
                      className="tw-w-5 tw-h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="tw-text-sm tw-font-medium">
                      Property Owner
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-4">
                <ShimmerThumbnail height={128} width={128} rounded />
                <div className="tw-flex tw-flex-col tw-gap-3">
                  <ShimmerThumbnail height={32} width={200} rounded />
                  <ShimmerThumbnail height={20} width={150} rounded />
                </div>
              </div>
            )}
          </div>

          {/* Section Title */}
          <div className="tw-mb-8">
            <div className="tw-flex tw-items-center tw-gap-3 tw-mb-2">
              <div className="tw-w-1 tw-h-8 tw-bg-blue-500 tw-rounded-full"></div>
              <h2 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-text-gray-900">
                <FormattedMessage id="Other units" />
              </h2>
            </div>
            <p className="tw-text-gray-600 tw-text-sm sm:tw-text-base tw-ml-6">
              Explore more properties from this owner
            </p>
          </div>

          {/* Units Grid */}
          {!data ? (
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-6">
              {[...Array(8)].map((e, i) => (
                <div
                  key={i}
                  className="tw-bg-white tw-rounded-xl tw-shadow-md tw-overflow-hidden"
                >
                  <ShimmerThumbnail height={200} rounded />
                  <div className="tw-p-4 tw-space-y-3">
                    <ShimmerThumbnail height={20} width="80%" rounded />
                    <ShimmerThumbnail height={16} width="60%" rounded />
                    <ShimmerThumbnail height={16} width="40%" rounded />
                  </div>
                </div>
              ))}
            </div>
          ) : data?.units?.length > 0 ? (
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-6">
              {data?.units.map((unit, i) => {
                return (
                  <div
                    key={i}
                    className="tw-transform tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-xl"
                  >
                    <PopularCard
                      id={unit.id}
                      title={unit.title}
                      image={unit?.main_image?.url || unit.images[0]?.url}
                      default_price={unit.default_price}
                      bathrooms={unit.bathrooms}
                      bed_rooms={unit.bed_rooms}
                      klass={unit.klass}
                      is_favourite={unit.is_favourite}
                      active_ranges={unit.active_ranges}
                      nearest_active_ranges={unit.nearest_active_ranges}
                      updateFavList={handleUpdateFavList}
                      favouritesList={favourites}
                      total_price={unit.total_price}
                      current_price={unit.current_price}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="tw-text-center tw-py-16">
              <div className="tw-mb-4">
                <svg
                  className="tw-w-16 tw-h-16 tw-text-gray-400 tw-mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="tw-text-lg tw-font-medium tw-text-gray-900 tw-mb-2">
                No Properties Found
              </h3>
              <p className="tw-text-gray-600 tw-max-w-md tw-mx-auto">
                <FormattedMessage id="noDataFound" />
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
