import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Owner = dynamic(() => import("../../Components/Owner"), {
  loading: () => <ReactLoader />,
});

const DelayedOwner = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1400);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <Owner /> : <ReactLoader />}</>;
};

export default DelayedOwner;
