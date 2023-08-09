import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Offers = dynamic(() => import("../../Components/Offers"), {
  loading: () => <ReactLoader />,
  suspense: true,
});

const DelayedOffers = () => {
  return (
    <Suspense fallback={<ReactLoader />}>
      <Offers />
    </Suspense>
  );
};

export default DelayedOffers;
