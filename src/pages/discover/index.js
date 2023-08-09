import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Discover = dynamic(() => import("../../Components/Discover"), {
  loading: () => <ReactLoader />,
});

export default Discover;
