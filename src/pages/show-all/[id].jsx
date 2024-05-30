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

      <main className="popularList_container">
        {!uiBuilderState.loading && !uiBuilderState.error && (
          <h1 className="py-5">{uiBuilderState.uiBuilderData?.title}</h1>
        )}
        <section className="popularList">
          {uiBuilderState.error && <Error error={uiBuilderState.error} />}
          {uiBuilderState.loading &&
            [...Array(6)].map((e, i) => (
              <div className="col-6" key={i}>
                <ShimmerThumbnail height={250} rounded />
              </div>
            ))}

          {!uiBuilderState.loading && !uiBuilderState.error && (
            <>
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
                  <PopularCard
                    id={id}
                    key={i}
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
                )
              )}
            </>
          )}
        </section>
        {uiBuilderState.uiBuilderData && (
          <Pagination
            lastPage={uiBuilderState.uiBuilderData?.meta?.last_page}
            callBack={getPageNumberAndFetch}
          />
        )}
      </main>
    </>
  );
}
