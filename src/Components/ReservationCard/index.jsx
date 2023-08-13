import { FormattedMessage } from "react-intl";
import { useRouter } from "next/navigation";
import styles from "./reservationCard.module.css";

const ReservationCard = ({ data, key }) => {
  const router = useRouter();
  const getDayMonth = (fullDatetime) => {
    const month = fullDatetime.slice(5, 7);
    const day = fullDatetime.slice(8, 10);
    return `${month}-${day}`;
  };

  const handleNavigateToDetails = (id) => {
    router.push(`/reservations/${id}`);
  };

  return (
    <div
      className={`${styles.reservation_card} d-flex cursor-pointer`}
      key={key}
      onClick={() => handleNavigateToDetails(data.id)}
    >
      <div className={styles.main_image}>
        <img src={data.unit.main_image?.url} alt="main image" />
      </div>
      <div className={`${styles.info}`}>
        <div>
          <p className={styles.unit_type}>{data.unit.type}</p>
        </div>
        <h3 className={`mb-3 ${styles.title}`}>{data.unit.title}</h3>
        <p className={`mb-5 ${styles.details}`}>
          <span className="me-3">
            {data.days} <FormattedMessage id="nights" />
          </span>
          <span>
            ( <FormattedMessage id="from" /> &nbsp;
            <span className="date">{getDayMonth(data.from)}</span> &nbsp;
            <FormattedMessage id="to" /> &nbsp;
            <span className="date">{getDayMonth(data.to)}</span> )
          </span>
        </p>
        <p className={`d-flex ${styles.total_cost}`}>
          <span>
            <FormattedMessage id="totalCost" />
          </span>
          <span>
            {data.total_price} <FormattedMessage id="LE" />
          </span>
        </p>
      </div>
      <div className={`d-flex flex-column justify-content-between`}>
        {data.is_reviewed ? (
          <p className={`${styles.review} cursor-pointer`}>
            <span>
              <FormattedMessage id="reviewYourRent" />
            </span>
            <img src="/assets/like.png" alt="Like" className="ms-4" />
          </p>
        ) : (
          <p></p>
        )}
        <p className={`align-self-end ${styles.status} ${data.status}`}>
          {data.status}
        </p>
      </div>
    </div>
  );
};

export default ReservationCard;
