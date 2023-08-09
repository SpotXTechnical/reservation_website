import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Regions = dynamic(() => import("../../Components/Regions"), {
  loading: () => <ReactLoader />,
});

export default Regions;
