"use client";
import { Inter } from "@next/font/google";
import HomeHeading from "../Components/HomeHeading/HomeHeading";
import RegionsHomeList from "../Components/RegionsHomeList/RegionsHomeList";
import OffersList from "../Components/OffersList/OffersList";
import SubscribeUs from "../Components/SubscribeUs/SubscribeUs";
import MostPopularList from "../Components/MostPopularList/MostPopularList";
import Error from "../Components/Error/Error";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import store, { langAction } from "../store";
import { useEffect, useReducer, useState } from "react";
import { getUiBuilders } from "../app/utils/ui-builders/ui-builders";
import ErrorBoundary from "../Components/ErrorBoundary/ErrorBoundary";
import Loading from "../Components/Loading/Loading";
import * as constants from "../app/utils/ui-builders/constants";
import { ShimmerThumbnail } from "react-shimmer-effects";
const inter = Inter({ subsets: ["latin"] });
const LOADING_STATE = "LOADING_STATE";
const ERROR_STATE = "ERROR_STATE";
const SUCCESS_STATE = "SUCCESS_STATE";
const initialState = {
  error: "",
  loading: true,
  sections: {},
};
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
        sections: action.payload,
      };
    default:
      return initialState;
  }
};
export default function Home() {
  let { lang } = useSelector((state) => state.language);

  const router = useRouter();
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }
  // Detect route Link and redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idKey = urlParams.get("idKey");
    const propertyNumber = urlParams.get("from_unit");

    if (
      window.location.search.includes("idKey") ||
      window.location.search.includes("targetKey")
    ) {
      if (window.location.search.includes("unit")) {
        router.push(`/properties/${idKey}`);
      }
    } else if (window.location.search.includes("subRegion")) {
      router.push(`/subRegion/${idKey}`);
    }
    if (propertyNumber) {
      router.push(`/properties/${propertyNumber}`);
    }
  }, [router]);

  const [uiBuildersState, dispatch] = useReducer(reducer, initialState);

  // get ui builders
  useEffect(() => {
    const getBuilders = async () => {
      try {
        dispatch({ type: LOADING_STATE });
        const response = await getUiBuilders();
        const sections = Promise.all([...response]).then((sections) => {
          dispatch({ type: SUCCESS_STATE, payload: sections });
        });
      } catch (error) {
        dispatch({ type: ERROR_STATE, payload: error.message });
      }
    };
    getBuilders();
  }, [lang]);

  const getuiBuilderComponents = (uiBuildersData) => {
    const renderedSections = uiBuildersData.map((uiData) => {
      switch (uiData?.type) {
        case constants.UNITS:
          return (
            <MostPopularList
              unitsData={uiData}
              key={`${uiData.title}${uiData.type}`}
            />
          );

        case constants.SUB_REGION:
          return (
            <RegionsHomeList
              subRegionData={uiData}
              key={`${uiData.title}${uiData.type}`}
            />
          );
      }
    });
    return renderedSections;
  };

  return (
    <main
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={lang === "ar" ? "rtl" : "ltr"}
    >
      {uiBuildersState.error && <Error error={uiBuildersState.error} />}
      {uiBuildersState.loading && (
        <div className="popularList">
          {[...Array(4)].map((e, i) => (
            <ShimmerThumbnail key={i} height={250} rounded />
          ))}
        </div>
      )}
      {!uiBuildersState.error && !uiBuildersState.loading && (
        <>
          <ErrorBoundary fallback={<Error error={uiBuildersState.error} />}>
            <HomeHeading />
            {getuiBuilderComponents(uiBuildersState.sections)}
            <SubscribeUs />
          </ErrorBoundary>
        </>
      )}
    </main>
  );
}
