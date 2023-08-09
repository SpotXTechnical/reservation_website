import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Reservations = dynamic(() => import("../../Components/Reservations"), {
  loading: () => <ReactLoader />,
});

export default Reservations;
