"use client";
import { getRegionsWithSubRegionsList } from "@/app/Apis/HomeApis";
import { useEffect, useState } from "react";
import ImportantRegionsCard from "../SharedComponents/ImportantRegionsCard/ImportantRegionsCard";
import Title from "../SharedComponents/Title/Title";
import ViewAll from "../SharedComponents/ViewAll/ViewAll";
import { ShimmerThumbnail } from "react-shimmer-effects";
import styles from "./OffersList.module.css";
import { useSelector } from "react-redux";

const OffersList = () => {
  const [data, setData] = useState({});
  let { lang } = useSelector((state) => state.language);
  useEffect(() => {
    getRegionsWithSubRegionsList().then((res) => setData(res));
  }, [lang]);
  return (
    <div className={styles.recomended_regions_container}>
      <div className={styles.recommended_list_wrapper}>
        {Object.keys(data).length > 0 ? (
          <div className="w-100">
            {data?.data?.map((region, i) => (
              <div className="w-100" key={i}>
                <div className={styles.recomended_regions_list_header}>
                  <Title text={region.name} />
                  <ViewAll />
                </div>
                <div className={styles.recommended_regions_list_parent}>
                  <div className={styles.recommended_regions_list}>
                    {region?.sub_regions?.map(({ id, name, images }) => (
                      <ImportantRegionsCard
                        id={id}
                        key={id}
                        name={name}
                        image={images[0]?.url}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.shimmer_wrapper}>
            {[...Array(4)].map((e, i) => (
              <ShimmerThumbnail key={i} height={250} rounded />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersList;
