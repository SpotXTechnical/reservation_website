import Image from "next/image";
import CalendarImage from "../../../public/assets/ic_calendar.svg";
import VerifiedIcon from "../../../public/assets/check-verified.svg";
import { FormattedMessage } from "react-intl";
import styles from "./FinancialSummary.module.css";
export const FinancialSummary = ({
  from,
  to,
  nights,
  totalCost,
  walletBalance,
  downPayment,
  cashToOwner,
  subTotal,
}) => {
  return (
    <>
      <div className={styles.info_container}>
        <div className={styles.date}>
          <Image {...CalendarImage} alt="calendar" />
          <div className={styles.summary_wrapper}>  
            <div className={styles.reservation_date}>
              <FormattedMessage id="Reservation_date" />
              <p>{nights} Nights</p> 
            </div>
            <div className={styles.range}>
              <p className={styles.format_date}>
                <FormattedMessage id="from" />:<span>{from}</span>
              </p>
              <p className={styles.format_date}>
                <FormattedMessage id="to" />:<span>{to}</span>
              </p>
            </div>
          </div>
        </div>
        <hr className={styles.horizontal_divider} />
        <div className={styles.date}>
          <Image {...CalendarImage} alt="calendar" />
          <div className={styles.summary_wrapper}>
            <div className={styles.total_cost}>
              <FormattedMessage id="total_cost" />
              <p>{totalCost}</p>
            </div>
            <div className={`${styles.full_width} ${styles.range}`}>
              <p className={styles.total_cost}>
                <FormattedMessage id="Wallet Balance" />
                <span>{walletBalance}</span>
              </p>
              <hr className={styles.horizontal_divider} />
              <p className={styles.total_cost}>
                <FormattedMessage id="Sub total" />
                <span>{subTotal}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.payment_container}>
        <div className={styles.down_payment}>
          <p className={styles.bold}>
            <FormattedMessage id="Down Payment" />
          </p>
          <p className="flex align-items-center gap-1">
            <Image {...VerifiedIcon} alt="verified" />{" "}
            {downPayment ? `${downPayment} LE` : "N/A"}
          </p>
        </div>
        <div className={styles.down_payment}>
          <p className={styles.bold}>
            <FormattedMessage id="Cash To Owner" />
          </p>
          <p>{cashToOwner ? `${cashToOwner} LE` : "N/A"}</p>
        </div>
      </div>
    </>
  );
};
