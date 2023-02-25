import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer_wrapper}>
      <div className="d-flex mb-4">
        <div className="col-sm-6">
          <p className={styles.about_spotx}>About Spotx</p>
          <span className={styles.about}>
            “Maecenas faucibus mollis interdum. Nullamion etaquis risus eget
            urna mollis ornare vel eu leonardifaucibus mollis interdum”...{" "}
          </span>
        </div>
        <div className="col-sm-3">
          <ul>
            <li>Rent your property</li>
            <li>Privacy & policy</li>
            <li>terms and conditions</li>
          </ul>
        </div>
        <div className="col-sm-3">
          <ul>
            <li>Conact us</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className={styles.copy_rights}>
          Copyright © 2015 - 2021. Traview - The Number One Platform in Egypt.
          All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
