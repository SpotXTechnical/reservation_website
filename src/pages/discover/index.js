import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Discover = dynamic(() => import("../../Components/Discover"), {
  loading: () => <ReactLoader />,
});

const DelayedDiscover = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1700);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <Discover /> : <ReactLoader />}</>;
};

export default DelayedDiscover;
