import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Terms = dynamic(() => import("../../Components/Terms"), {
  loading: () => <ReactLoader />,
});

export default Terms;
