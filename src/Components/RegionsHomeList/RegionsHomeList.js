"use client";
import { getRegions } from "@/app/Apis/HomeApis";
import { useEffect, useState } from "react";
import RegionsCard from "../SharedComponents/RegionsCard/RegionsCard";
import Title from "../SharedComponents/Title/Title";
import ViewAll from "../SharedComponents/ViewAll/ViewAll";
import { ShimmerThumbnail } from "react-shimmer-effects";
import styles from "./RegionsHomeList.module.css";

const RegionsHomeList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getRegions().then((res) => setData(res.data.slice(0, 4)));
  }, []);
  return (
    <div className={styles.regionsList_container}>
      <div className={styles.regionsList_header}>
        <Title text="Our Destinations" />
        <ViewAll />
      </div>
      <div className={styles.regionsList}>
        {data.length > 0
          ? data.map(({ name, images }, id) => (
              <RegionsCard id={id} name={name} image={images[0]?.url} />
            ))
          : [...Array(4)].map((e, i) => (
              <ShimmerThumbnail key={i} height={250} rounded />
            ))}
      </div>
    </div>
  );
};

export default RegionsHomeList;
