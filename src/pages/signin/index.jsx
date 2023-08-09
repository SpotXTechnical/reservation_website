import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const SignIn = dynamic(() => import("../../Components/SignIn"), {
  loading: () => <ReactLoader />,
});

export default SignIn;
