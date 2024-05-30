import {
  getUnitsPerRegion,
  getAllUnits,
  getUnitsPerSubRegion,
  getFavouriteList,
} from "../../app/Apis/UnitsApis";
import { useEffect, useReducer, useState } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import PopularCard from "../SharedComponents/PopularCard/PopularCard";
import Pagination from "../Pagination/Pagination";
import Error from "../Error/Error";

const initialState = {
  regionUnits: null,
  loading: false,
  error: "",
};
const LOADING_STATE = "LOADING_STATE";
const ERROR_STATE = "ERROR_STATE";
const SUCCESS_STATE = "SUCCESS_STATE";
const RESET_UNITS = "RESET_UNITS";
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
    case RESET_UNITS:
      return {
        ...state,
        regionUnits: null,
      };
    case SUCCESS_STATE:
      return {
        error: "",
        loading: false,
        regionUnits: action.payload,
      };
    default:
      return initialState;
  }
};

const RegionUnits = ({ regionId, className, isSub }) => {
  const [favourites, setFav] = useState([]);
  const [meta, setMeta] = useState("");
  const [regionUnitsState, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: LOADING_STATE });
    isSub
      ? getUnitsPerSubRegion(regionId)
          .then((res) => {
            dispatch({ type: SUCCESS_STATE, payload: res.data });
            setMeta(res.meta);
          })
          .catch((error) => {
            dispatch({ type: ERROR_STATE, payload: error.message });
          })
      : getUnitsPerRegion(regionId)
          .then((res) => {
            dispatch({ type: SUCCESS_STATE, payload: res.data });
            setMeta(res.meta);
          })
          .catch((error) => {
            dispatch({ type: ERROR_STATE, payload: error.message });
          });
  }, [isSub, regionId]);

  useEffect(() => {
    handleUpdateFavList();
  }, []);

  const handleUpdateFavList = () => {
    getFavouriteList().then((res) => setFav(res?.data));
  };
  const handlePagination = async (pageNumber) => {
    dispatch({ type: RESET_UNITS });
    try {
      dispatch({ type: LOADING_STATE });
      isSub
        ? getUnitsPerSubRegion(regionId, { page: pageNumber }).then((res) => {
            dispatch({ type: SUCCESS_STATE, payload: res.data });
          })
        : getUnitsPerRegion(regionId).then((res) => {
            dispatch({ type: SUCCESS_STATE, payload: res.data });
          });
    } catch (error) {
      dispatch({ type: ERROR_STATE, payload: error.message });
    }
  };

  return (
    <main>
      <section className={`${className} mb-0`}>
        {regionUnitsState?.regionUnits &&
          Object.keys(regionUnitsState.regionUnits).length > 0 &&
          regionUnitsState?.regionUnits.map((unit, i) => {
            return (
              <PopularCard
                key={unit.id}
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
                favouritesList={favourites}
                updateFavList={handleUpdateFavList}
                total_price={unit.total_price}
                current_price={unit.current_price}
              />
            );
          })}
      </section>

      {regionUnitsState?.loading && (
        <div className={`${className} mb-0`}>
          {[...Array(4)].map((e, i) => (
            <ShimmerThumbnail key={i} height={250} rounded />
          ))}
        </div>
      )}

      {regionUnitsState?.error && <Error error={regionUnitsState?.error} />}
      {meta && (
        <Pagination lastPage={meta?.last_page} callBack={handlePagination} />
      )}
    </main>
  );
};

export default RegionUnits;
