import React from "react";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";
import loadable from "@loadable/component";
import Offers from "../../Components/Offers/Offers";
import OffersComponent from "../../Components/Offers";

// const LoadableOffers = loadable(() => import("../../Components/Offers/Offers"), {
//   fallback: <ReactLoader />,
// });

const OffersWrapper = () => {
  return <OffersComponent />;
};

export default OffersWrapper;
