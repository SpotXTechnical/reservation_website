import dynamic from "next/dynamic";
import ReactLoader from "../../Components/ReactLoader/ReactLoader";

const Profile = dynamic(() => import("../../Components/Profile"), {
  loading: () => <ReactLoader />,
});

export default Profile;
