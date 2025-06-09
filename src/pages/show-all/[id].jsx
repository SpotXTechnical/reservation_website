import React, { useEffect, useReducer, useState } from "react";
import { getUiBuilder } from "../../app/utils/ui-builders/ui-builders";
import { useRouter } from "next/router";
import Error from "../../Components/Error/Error";
import { ShimmerThumbnail } from "react-shimmer-effects";
import PopularCard from "../../Components/SharedComponents/PopularCard/PopularCard";
import { getFavouriteList } from "../../app/Apis/UnitsApis";
import Pagination from "../../Components/Pagination/Pagination";
import { useSelector } from "react-redux";
import Head from "next/head";
import Title from "../../Components/SharedComponents/Title/Title";

const initialState = {
  error: "",
  loading: false,
  uiBuilderData: null,
};
const LOADING_STATE = "LOADING_STATE";
const ERROR_STATE = "ERROR_STATE";
const SUCCESS_STATE = "SUCCESS_STATE";
const CHANGE_UIBUILDERS_DATA = "CHANGE_UIBUILDERS_DATA";

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING_STATE:
      return {
        ...state,
        loading: true,
      };
    case ERROR_STATE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SUCCESS_STATE:
      return {
        loading: false,
        error: "",
        uiBuilderData: action.payload,
      };
    case CHANGE_UIBUILDERS_DATA:
      return {
        ...state,
        uiBuilderData: {},
      };
    default:
      return initialState;
  }
};
export default function ShowAll() {
  const router = useRouter();
  const { id } = router.query;
  const [uiBuilderState, dispatch] = useReducer(reducer, initialState);
  const [favourites, setFav] = useState([]);
  let { lang } = useSelector((state) => state.language);

  useEffect(() => {
    if (id) {
      dispatch({ type: LOADING_STATE });
      const getUiBuilderData = async () => {
        try {
          const response = await getUiBuilder(id);
          dispatch({ type: SUCCESS_STATE, payload: response });
        } catch (error) {
          dispatch({ type: ERROR_STATE, payload: error.message });
        }
      };
      getUiBuilderData();
      getFavouriteList().then((res) => setFav(res?.data));
    }
  }, [id, lang]);

  const handleUpdateFavList = () => {
    getFavouriteList().then((res) => setFav(res?.data));
  };

  const getPageNumberAndFetch = async (pageNumber) => {
    try {
      dispatch({ type: CHANGE_UIBUILDERS_DATA });
      dispatch({ type: LOADING_STATE });
      const response = await getUiBuilder(id, pageNumber);
      dispatch({ type: SUCCESS_STATE, payload: response });
    } catch (error) {
      dispatch({ type: ERROR_STATE, payload: error.message });
    }
  };
  return (
    <>
      <Head>
        <title>Show All | SpotX</title>
        <meta name="description" content={"Show all unit in SpotX"} />
      </Head>

      <main className="tw-min-h-screen tw-bg-gray-50 tw-py-6 tw-px-4 sm:tw-px-6 lg:tw-px-8">
        <div className="tw-max-w-7xl tw-mx-auto">
          {/* Page Header */}
          {!uiBuilderState.loading && !uiBuilderState.error && (
            <div className="tw-mb-8">
              <Title text={uiBuilderState.uiBuilderData?.title} />

              <div className="tw-w-20 tw-h-1 tw-bg-blue-500 tw-rounded-full"></div>
            </div>
          )}

          {/* Error State */}
          {uiBuilderState.error && (
            <div className="tw-flex tw-items-center tw-justify-center tw-py-16">
              <Error error={uiBuilderState.error} />
            </div>
          )}

          {/* Loading State */}
          {uiBuilderState.loading && (
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
          )}

          {/* Properties Grid */}
          {!uiBuilderState.loading && !uiBuilderState.error && (
            <section className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-6 tw-mb-12">
              {uiBuilderState.uiBuilderData?.sectionData.map(
                (
                  {
                    images,
                    main_image,
                    title,
                    klass,
                    bathrooms,
                    bed_rooms,
                    default_price,
                    is_favourite,
                    active_ranges,
                    nearest_active_ranges,
                    id,
                    current_price,
                    total_price,
                  },
                  i
                ) => (
                  <div
                    key={i}
                    className="tw-transform tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-xl"
                  >
                    <PopularCard
                      id={id}
                      title={title}
                      image={main_image?.url || images[0]?.url}
                      default_price={default_price}
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
                  </div>
                )
              )}
            </section>
          )}

          {/* Pagination */}
          {uiBuilderState.uiBuilderData && (
            <div className="tw-flex tw-justify-center tw-mt-8">
              <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2">
                <Pagination
                  lastPage={uiBuilderState.uiBuilderData?.meta?.last_page}
                  callBack={getPageNumberAndFetch}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
