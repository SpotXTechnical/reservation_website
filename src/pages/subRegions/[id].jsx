import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const SubRegion = dynamic(() => import("../../Components/subRegion"), {
  loading: () => <ReactLoader />,
});

const DelayedSubRegion = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1700);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <SubRegion /> : <ReactLoader />}</>;
};

export default DelayedSubRegion;
