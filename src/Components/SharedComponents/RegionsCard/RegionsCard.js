import styles from "./RegionsCard.module.css";
const RegionsCard = ({ id, name, image, handleClick }) => {
  return (
    <div className={styles.regions_card} key={id} onClick={handleClick}>
      <img src={image} alt="region" className={styles.region_img} />
      <div className={styles.region_title}>{name}</div>
    </div>
  );
};

export default RegionsCard;
