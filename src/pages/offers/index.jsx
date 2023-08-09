import React from "react";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";
import styles from "./offers.module.css";
import loadable from "@loadable/component";

const LoadableOffers = loadable(() => import("../../Components/Offers"), {
  fallback: <ReactLoader />,
});

const OffersWrapper = () => {
  return <LoadableOffers styles={styles} />;
};

export default OffersWrapper;
