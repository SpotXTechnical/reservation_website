import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Reservations = dynamic(() => import("../../Components/Reservations"), {
  loading: () => <ReactLoader />,
});

const DelayedReservations = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1400);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <Reservations /> : <ReactLoader />}</>;
};

export default DelayedReservations;
