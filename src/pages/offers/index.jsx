import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Offers = dynamic(() => import("../../Components/Offers"), {
  loading: () => <ReactLoader />,
});

const DelayedOffers = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1200);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <Offers /> : <ReactLoader />}</>;
};

export default DelayedOffers;