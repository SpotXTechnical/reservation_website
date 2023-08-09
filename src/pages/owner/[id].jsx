import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Owner = dynamic(() => import("../../Components/Owner"), {
  loading: () => <ReactLoader />,
});

export default Owner;
