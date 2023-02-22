"use client";
import { getMostPopularProperties } from "@/app/Apis/HomeApis";
import { useEffect, useState } from "react";
import PopularCard from "../SharedComponents/PopularCard/PopularCard";
import Title from "../SharedComponents/Title/Title";
import ViewAll from "../SharedComponents/ViewAll/ViewAll";
import { ShimmerThumbnail } from "react-shimmer-effects";
import styles from "./MostPopularList.module.css";

const MostPopularList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getMostPopularProperties().then((res) => setData(res.data.slice(0, 4)));
  }, []);
  return (
    <div className={styles.popularList_container}>
      <div className={styles.popularList_header}>
        <Title text="Most Popular Properties" />
        <ViewAll />
      </div>
      <div className={styles.popularList}>
        {data.length > 0
          ? data.map(
              (
                {
                  images,
                  title,
                  type,
                  bathrooms,
                  beds,
                  default_price,
                  is_favourite,
                  active_ranges,
                  nearest_active_ranges
                },
                id
              ) => (
                <PopularCard
                  id={id}
                  title={title}
                  image={images[0]?.url}
                  default_price={default_price}
                  bathrooms={bathrooms}
                  beds={beds}
                  type={type}
                  is_favourite={is_favourite}
                  active_ranges={active_ranges}
                  nearest_active_ranges={nearest_active_ranges}
                />
              )
            )
          : [...Array(4)].map((e, i) => (
              <ShimmerThumbnail key={i} height={250} rounded />
            ))}
      </div>
    </div>
  );
};

export default MostPopularList;
