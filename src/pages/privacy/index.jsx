import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Privacy = dynamic(() => import("../../Components/Privacy"), {
  loading: () => <ReactLoader />,
});

export default Privacy;
