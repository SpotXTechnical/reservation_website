import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const SignUp = dynamic(() => import("../../Components/SignUp"), {
  loading: () => <ReactLoader />,
});

const DelayedSignUp = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1300);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <SignUp /> : <ReactLoader />}</>;
};

export default DelayedSignUp;
