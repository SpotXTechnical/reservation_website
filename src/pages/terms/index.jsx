import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Terms = dynamic(() => import("../../Components/Terms"), {
  loading: () => <ReactLoader />,
});

const DelayedTerms = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1700);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <Terms /> : <ReactLoader />}</>;
};

export default DelayedTerms;
