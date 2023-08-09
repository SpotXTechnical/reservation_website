import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const SignUp = dynamic(() => import("../../Components/SignUp"), {
  loading: () => <ReactLoader />,
});

export default SignUp;
