import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Regions = dynamic(() => import("../../Components/Regions"), {
  loading: () => <ReactLoader />,
});

const DelayedRegions = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1400);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <Regions /> : <ReactLoader />}</>;
};

export default DelayedRegions;
