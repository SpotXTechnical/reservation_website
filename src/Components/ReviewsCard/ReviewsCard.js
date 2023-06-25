"use client";
import ReactStars from "react-rating-stars-component";
import styles from "./ReviewsCard.module.css";

const ReviewsCard = ({ imgSrc, name, subTitle, rate, review }) => {
  const avatar = "/assets/avatar.png";
  return (
    <div className={styles.reviews_container}>
      <div className="d-flex justify-content-between">
        <div className=" d-flex gap-3">
          <div>
            <img
              className={styles.img}
              alt="Reviewer_img"
              src={imgSrc || avatar}
            />
          </div>
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.sub_title}> {subTitle}</p>
          </div>
        </div>
        <div>
          <ReactStars
            count={5}
            edit={false}
            size={20}
            value={rate}
            activeColor="#FDB022"
          />
        </div>
      </div>
      <div>
        <p className={styles.review}>{review}</p>
      </div>
    </div>
  );
};

export default ReviewsCard;
