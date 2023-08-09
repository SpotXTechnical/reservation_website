import ReactLoading from "react-loading";
import styles from "./loader.module.css";

const ReactLoader = () => (
  <ReactLoading
    className={styles.loader}
    type="spinningBubbles"
    color="#44bcb7"
    height={"5%"}
    width={"5%"}
  />
);

export default ReactLoader;
