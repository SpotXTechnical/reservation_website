import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const SubRegion = dynamic(() => import("../../Components/subRegion"), {
  loading: () => <ReactLoader />,
});

export default SubRegion;
