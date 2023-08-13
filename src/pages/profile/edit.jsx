import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const EditProfile = dynamic(() => import("../../Components/EditProfile"), {
  loading: () => <ReactLoader />,
});

const DelayedEditProfile = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1300);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <EditProfile /> : <ReactLoader />}</>;
};

export default DelayedEditProfile;
