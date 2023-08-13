import React from "react";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";
import loadable from "@loadable/component";

const LoadableOffers = loadable(() => import("../../Components/Offers/Offers"), {
  fallback: <ReactLoader />,
});

const OffersWrapper = () => {
  const OffersComponent = LoadableOffers;
  return <OffersComponent />;
};

export default OffersWrapper;
