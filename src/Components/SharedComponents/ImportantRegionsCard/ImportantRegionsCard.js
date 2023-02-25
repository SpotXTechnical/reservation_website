import styles from "./ImportantRegionsCard.module.css";
const ImportantRegionsCard = ({ id, name, image }) => {
  return (
    <div className={styles.important_regions_card_wrapper} key={id}>
      <img
        className={styles.important_regions_img}
        src={image}
        alt="region-img"
      />
      <p>{name}</p>
    </div>
  );
};

export default ImportantRegionsCard;
