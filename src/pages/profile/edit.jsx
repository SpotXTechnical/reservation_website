import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const EditProfile = dynamic(() => import("../../Components/EditProfile"), {
  loading: () => <ReactLoader />,
});

export default EditProfile;
