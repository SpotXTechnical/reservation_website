import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Profile = dynamic(() => import("../../Components/Profile"), {
  loading: () => <ReactLoader />,
});

const DelayedProfile = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1700);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <Profile /> : <ReactLoader />}</>;
};

export default DelayedProfile;
