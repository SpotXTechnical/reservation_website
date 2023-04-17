"use client";
import { getRegions } from "@/app/Apis/HomeApis";
import { useEffect, useState } from "react";
import RegionsCard from "../SharedComponents/RegionsCard/RegionsCard";
import Title from "../SharedComponents/Title/Title";
import ViewAll from "../SharedComponents/ViewAll/ViewAll";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import styles from "./RegionsHomeList.module.css";

const RegionsHomeList = () => {
  const intl = useIntl();
  const [data, setData] = useState([]);
  let { lang } = useSelector((state) => state.language);
  useEffect(() => {
    getRegions().then((res) => setData(res.data.slice(0, 4)));
  }, [lang]);
  return (
    <div className={styles.regionsList_container}>
      <div className={styles.regionsList_header}>
        <Title text={intl.formatMessage({ id: "home.destinations" })} />
        <ViewAll />
      </div>
      <div className={styles.regionsList_wrapper}>
        <div className={styles.regionsList}>
          {data.length > 0
            ? data.map(({ name, images }, id) => (
                <RegionsCard key={id} id={id} name={name} image={images[0]?.url} />
              ))
            : [...Array(4)].map((e, i) => (
                <ShimmerThumbnail key={i} height={250} rounded />
              ))}
        </div>
      </div>
    </div>
  );
};

export default RegionsHomeList;
