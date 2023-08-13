import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const SignIn = dynamic(() => import("../../Components/SignIn"), {
  loading: () => <ReactLoader />,
});

const DelayedSignIn = () => {
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowOffers(true);
    }, 1700);

    return () => clearTimeout(delayTimeout);
  }, []);

  return <>{showOffers ? <SignIn /> : <ReactLoader />}</>;
};

export default DelayedSignIn;
