import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const PropertyDetails = dynamic(
  () => import("../../Components/PropertyDetails"),
  {
    loading: () => <ReactLoader />,
  }
);

const DelayedPropertyDetails = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1400);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <PropertyDetails /> : <ReactLoader />}</>;
};

export default DelayedPropertyDetails;
