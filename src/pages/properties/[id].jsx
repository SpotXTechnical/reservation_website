import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const PropertyDetails = dynamic(
  () => import("../../Components/PropertyDetails"),
  {
    loading: () => <ReactLoader />,
  }
);

export default PropertyDetails;
