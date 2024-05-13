import { useEffect, useReducer, useState } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { useRouter } from "next/router";
import { getRegionDetails } from "../../app/Apis/RegionsApis";
import { Carousel } from "react-responsive-carousel";
import SubRegions from "../../Components/SubRegions";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";
import { FormattedMessage } from "react-intl";
import Error from "../../Components/Error/Error";

const initialState = {
  loading: false,
  error: "",
  subregionData: null,
};
const LOADING_STATE = "LOADING_STATE";
const ERROR_STATE = "ERROR_STATE";
const SUCCESS_STATE = "SUCCESS_STATE";
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
        subregionData: action.payload,
      };
    default:
      return initialState;
  }
};
export default function Regions() {
  const router = useRouter();
  const { id } = router.query;
  const [subRegionState, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState("");
  let { lang } = useSelector((state) => state.language);

  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }
  useEffect(
    function () {
      if (id) {
        dispatch({ type: LOADING_STATE });
        getRegionDetails(id, search, { page: 1 })
          .then((res) => {
            dispatch({ type: SUCCESS_STATE, payload: res.data });
          })
          .catch((error) => {
            dispatch({ type: ERROR_STATE, payload: error.message });
          });
      }
    },
    [id, search, lang]
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"} className="regions_container">
      <>
        {subRegionState?.subregionData?.images ? (
          <div className={`flex-center head`}>
            <Carousel showThumbs={false} showStatus={false} emulateTouch={true}>
              {subRegionState?.subregionData?.images?.map((slide) => (
                <div key={slide.id}>
                  <div
                    className="carousel_img"
                    style={{ backgroundImage: `url(${slide.url}` }}
                  ></div>
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <ShimmerThumbnail height={500} rounded />
        )}

        {subRegionState?.subregionData?.name && (
          <div className="d-flex justify-content-center my-5 align-items-center">
            <img
              src="/assets/location.png"
              alt="location-icon"
              width={"24px"}
              height={"30px"}
              className="mx-3"
            />
            <h2 className="region_name">
              {subRegionState?.subregionData.name}
            </h2>
          </div>
        )}

        <div className="mb-4 container_wrapper gap-3 d-flex flex-column flex-md-row align-items-center justify-content-center col-12 ">
          <span className="mx-3">
            <FormattedMessage id="searchIn" />{" "}
            {subRegionState?.subregionData?.name}{" "}
          </span>
          <div className={`search_container d-inline-block`}>
            <input
              type="text"
              className="search_input col-12 "
              onChange={handleSearch}
            />
            <img src="/assets/search-primary.png" alt="search-primary" />
          </div>
        </div>

        {/* {data?.sub_regions ? (
          (data?.sub_regions?.length > 0 || search!=="" )? (
            <SubRegions
              regionName={data.name}
              subRegions={data.sub_regions}
              withSearch={true}
              handleSearch={handleSearch}
            />
          ) : (
            <RegionUnits regionId={id} className={styles.units_container} />
          )
        ) : (
          <div className={styles.shimmer_wrapper}>
            {[...Array(4)].map((e, i) => (
              <ShimmerThumbnail key={i} height={250} rounded />
            ))}
          </div>
        )} */}

        {subRegionState?.subregionData?.sub_regions?.length > 0 && (
          <SubRegions
            regionName={data.name}
            subRegions={data.sub_regions}
            withSearch={true}
            handleSearch={handleSearch}
          />
        )}
        {subRegionState?.subregionData?.sub_regions?.length === 0 &&
          !subRegionState.loading && (
            <section className="d-flex align-items-center justify-content-center pt-4 mb-5">
              <div class="alert alert-primary w-50 text-center" role="alert">
                No Sub-Regions were found!
              </div>
            </section>
          )}
        {subRegionState.loading && (
          <div className="shimmer_wrapper">
            {[...Array(4)].map((e, i) => (
              <ShimmerThumbnail key={i} height={250} rounded />
            ))}
          </div>
        )}

        {subRegionState.error && <Error error={subRegionState.error} />}
      </>
    </main>
  );
}
