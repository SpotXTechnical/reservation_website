import Image from "next/image";
import CalendarImage from "../../../public/assets/ic_calendar.svg";
import Money from "../../../public/assets/money.svg";
import VerifiedIcon from "../../../public/assets/check-verified.svg";
import { FormattedMessage } from "react-intl";
import styles from "./FinancialSummary.module.css";
export const FinancialSummary = ({
  from,
  to,
  nights,
  totalCost,
  PayFromWallet,
  downPayment,
  cashToOwner,
  subTotal,
  status,
}) => {
  return (
    <>
      <div className={`${styles.payment_container} mb-4`}>
        <div className={styles.down_payment}>
          <p className={styles.bold}>
            <FormattedMessage id="Total Cost" />
          </p>
          <p className={styles.amount}>{totalCost ? `${totalCost} LE` : 0}</p>
        </div>
        <div className={styles.down_payment}>
          <p className={styles.bold}>
            <FormattedMessage id="Down Payment" />
          </p>
          <p className={`flex align-items-center gap-1 ${styles.amount}`}>
            {status === "reserved" ? (
              <Image src={VerifiedIcon} alt="verified" />
            ) : (
              ""
            )}
            {downPayment ? `${downPayment} LE` : "N/A"}
          </p>
        </div>
        <div className={styles.down_payment}>
          <p className={styles.bold}>
            <FormattedMessage id="Cash To Owner" />
          </p>
          <p className={styles.amount}>
            {cashToOwner ? `${cashToOwner} LE` : 0}
          </p>
        </div>
      </div>
      <div className={`${styles.info_container} mb-4`}>
        <div className={styles.date}>
          <Image src={CalendarImage} alt="calendar" />
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
        <div className={`${styles.date}`}>
          <Image src={Money} alt="calendar" />
          <div className={styles.summary_wrapper}>
            <div className={styles.total_cost}>
              <FormattedMessage id="total_cost" />
              <p>{totalCost ? `${totalCost} LE` : "0 LE"}</p>
            </div>
            <hr className={`${styles.horizontal_divider} mb-3`} />
            <div className={`${styles.full_width} ${styles.range}`}>
              <p className={styles.total_cost}>
                <FormattedMessage id="Down Payment" />
                <span>{downPayment ? `${downPayment} LE` : "N/A"}</span>
              </p>
              <p className={styles.total_cost}>
                <FormattedMessage id="Pay from wallet" />
                <span>
                  {PayFromWallet && PayFromWallet > 0
                    ? `-${PayFromWallet} LE`
                    : "0 LE"}{" "}
                </span>
              </p>
              <hr className={styles.horizontal_divider} />
              <p className={styles.total_cost}>
                <FormattedMessage id="Deposit" />
                <span>{subTotal} LE</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
