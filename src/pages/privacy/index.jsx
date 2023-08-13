import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Privacy = dynamic(() => import("../../Components/Privacy"), {
  loading: () => <ReactLoader />,
});

const DelayedPrivacy = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1400);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <Privacy /> : <ReactLoader />}</>;
};

export default DelayedPrivacy;
