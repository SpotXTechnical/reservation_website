import dynamic from "next/dynamic";
import ReactLoader from "../Components/ReactLoader/ReactLoader";

const Home = dynamic(() => import("../Components/Home"), {
  loading: () => <ReactLoader />,
});

export default Home;
