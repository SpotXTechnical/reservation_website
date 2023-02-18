import styles from "./RegionsCard.module.css";
const RegionsCard = ({ id, name, image }) => {
  return (
    <div className={styles.regions_card} key={id}>
      <img src={image} alt="region" className={styles.region_img} />
      <div className={styles.region_title}>{name}</div>
    </div>
  );
};

export default RegionsCard;
