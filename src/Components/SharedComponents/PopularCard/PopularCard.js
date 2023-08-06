import { useEffect, useState } from "react";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../../app/Apis/UnitsApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./PopularCard.module.css";
import moment from "moment";
import { useSelector } from "react-redux";
const PopularCard = ({
  id,
  key,
  image,
  title,
  type,
  bathrooms,
  beds,
  default_price,
  updateFavList,
  active_ranges,
  nearest_active_ranges,
  favouritesList,
}) => {
  const [isFav, setIsFav] = useState(false);
  let { lang } = useSelector((state) => state.language);
  useEffect(() => {
    if (favouritesList?.length > 0) {
      setIsFav(favouritesList?.some((item) => item.id === id));
    }
  }, [favouritesList]);

  const getOffers = () => {
    return active_ranges?.filter((date) => {
      const startDate = new Date(date.from);
      const endDate = new Date(date.to);
      const currentDate = new Date();
      return currentDate >= startDate && currentDate <= endDate;
    });
  };
  const handleAddToFavourite = (e, id) => {
    e.stopPropagation();
    //  isFav? removeFromFavourite(id) :  addToFavourite(id);
    isFav
      ? removeFromFavourite(id).then((res) => {
          updateFavList();
          toast.success(
            lang === "ar"
              ? "تمت إزالة العنصر من المفضلة"
              : "Item removed from favorites!",
            { autoClose: 5000 }
          );
        })
      : addToFavourite(id).then((res) => {
          updateFavList();
          toast.success(
            lang === "ar"
              ? "تمت إضافة العنصر إلي المفضلة"
              : "Item added to favorites!",
            { autoClose: 5000 }
          );
        });
  };

  return (
    <div
      className={styles.popular_card}
      key={key}
      onClick={() => (window.location.href = `/properties/${id}`)}
    >
      <div className={styles.unit_type_wrapper}>
        <div className={styles.unit_type}>{type}</div>
        {typeof window !== "undefined" && (
          <div onClick={(e) => handleAddToFavourite(e, id)}>
            <img
              src="/assets/Heart.png"
              alt="favourite"
              className={isFav ? styles.fav_icon : styles.fav_icon_disabled}
            />
          </div>
        )}
      </div>
      <div>
        <img src={image} alt="popular_regions" className={styles.popular_img} />
        <div className={styles.popular_header}>
          <div className={styles.popular_title}>{title}</div>
          <div className={styles.default_price}>
            {getOffers()?.length > 0 ? getOffers()[0].price : default_price} LE
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
          {nearest_active_ranges.length > 0 && getOffers()?.length === 0 && (
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
      <ToastContainer />
    </div>
  );
};

export default PopularCard;
