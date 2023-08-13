import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../Components/ReactLoader/ReactLoader";

const Home = dynamic(() => import("../Components/Home"), {
  loading: () => <ReactLoader />,
});

const DelayedHome = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1400);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <Home /> : <ReactLoader />}</>;
};

export default DelayedHome;
