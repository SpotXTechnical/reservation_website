import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const ReservationDetails = dynamic(
  () => import("../../Components/ReservationDetails"),
  {
    loading: () => <ReactLoader />,
  }
);

const DelayedReservationDetails = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1300);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <ReservationDetails /> : <ReactLoader />}</>;
};

export default DelayedReservationDetails;
