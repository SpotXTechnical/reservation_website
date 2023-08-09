import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const ReservationDetails = dynamic(
  () => import("../../Components/ReservationDetails"),
  {
    loading: () => <ReactLoader />,
  }
);

export default ReservationDetails;
