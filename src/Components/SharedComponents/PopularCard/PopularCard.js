import styles from "./PopularCard.module.css";
import moment from "moment";
const PopularCard = ({
  id,
  image,
  title,
  type,
  bathrooms,
  beds,
  default_price,
  is_favourite,
  active_ranges,
  nearest_active_ranges,
}) => {
  const getOffers = () => {
    return active_ranges?.filter((date) => {
      const startDate = new Date(date.from);
      const endDate = new Date(date.to);
      const currentDate = new Date();
      return currentDate >= startDate && currentDate <= endDate;
    });
  };
  return (
    <div className={styles.popular_card} key={id}>
      <div className={styles.unit_type_wrapper}>
        <div className={styles.unit_type}>{type}</div>
        <div>
          <img
            src="/assets/Heart.png"
            alt="favourite"
            className={
              is_favourite ? styles.fav_icon : styles.fav_icon_disabled
            }
          />
        </div>
      </div>
      <div>
        <img src={image} alt="popular_regions" className={styles.popular_img} />
        <div className={styles.popular_header}>
          <div className={styles.popular_title}>{title}</div>
          <div className={styles.default_price}>
            {getOffers().length > 0 ? getOffers()[0].price : default_price} LE
            <span className={styles.per_day}>/ day</span>
          </div>
        </div>
        <div className={styles.popular_header2}>
          <div className={styles.units_numbers_wrapper}>
            {beds && (
              <div className={styles.icons_wrapper}>
                <span className={styles.units_numbers}>{beds}</span>
                <img
                  src="/assets/bed.png"
                  alt="beds"
                  className={styles.bed_icon}
                />
              </div>
            )}
            {bathrooms && (
              <div className={styles.icons_wrapper}>
                <span className={styles.units_numbers}>{bathrooms}</span>
                <img
                  src="/assets/bath.png"
                  alt="bathrooms"
                  className={styles.bath_icon}
                />
              </div>
            )}
          </div>
          {nearest_active_ranges.length > 0 && getOffers().length === 0 && (
            <div className={styles.offers_wrapper}>
              <p className={styles.offer_title}>
                Offer At {moment(nearest_active_ranges[0].from).format("D MMM")}
              </p>
              <div className={styles.offer_price}>
                {nearest_active_ranges[0].price} LE{" "}
                <span className={styles.offers_per_day}>/ day</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularCard;
