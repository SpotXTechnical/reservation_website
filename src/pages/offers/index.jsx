import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Offers = dynamic(() => import("../../Components/Offers"), {
  loading: () => <ReactLoader />,
});

export default Offers;
