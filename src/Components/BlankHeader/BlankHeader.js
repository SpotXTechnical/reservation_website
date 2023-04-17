import styles from "./header.module.css";
import Button from "../SharedComponents/Button/Button";

export default function Header() {
  return (
    <div
      className={`container_wrapper d-flex align-items-center justify-content-between ${styles.header_wrapper}`}
    >
      <div className="col-sm-6">
        <img src="/assets/Logo.png" alt="Logo" />
      </div>
      <div className="col-sm-6 d-flex justify-content-end">
        <div className={styles.header_items_gap}>
          <div className="d-flex align-items-center gap-1 cursor-pointer">
            <img src="/assets/receipt-disscount.png" alt="offers" />
            <span className={styles.offers}>Offers</span>
          </div>
          <div className="d-flex align-items-center gap-1 cursor-pointer">
            <img src="/assets/shopping-bag.png" alt="reservations" />
            <span className={styles.menu_item}>Reservations</span>
          </div>
          <div className="d-flex align-items-center gap-1 cursor-pointer">
            <img src="/assets/global.png" alt="Language" />
            <span className={styles.menu_item}>Language</span>
            <img src="/assets/Vector.png" alt="down-arrow" />
          </div>
          <div
            className={`d-flex align-items-center gap-1 cursor-pointer ${styles.notifications_container}`}
          >
            <img src="/assets/notification.png" alt="notifications" />
            <div className={styles.notification_number}>2</div>
          </div>
          <div>
            <Button text="SIGN IN" />
          </div>
        </div>
      </div>
    </div>
  );
}
