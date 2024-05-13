"use client";
import { useEffect, useState } from "react";
import RegionsCard from "../SharedComponents/RegionsCard/RegionsCard";
import Title from "../SharedComponents/Title/Title";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const RegionsHomeList = ({ subRegionData }) => {
  const router = useRouter();
  const intl = useIntl();
  const [data, setData] = useState([]);
  let { lang } = useSelector((state) => state.language);
  const handleRedirectToRegionDetails = (id) => {
    router.push(`/regions/${id}`);
  };
  return (
    <div className="regionsList_container">
      <div className="regionsList_header">
        <Title text={subRegionData.title} />
        {/* <ViewAll /> */}
      </div>
      <div className="regionsList_wrapper">
        <div className="regionsList overflow-auto">
          {subRegionData.sectionData?.length > 0 &&
            subRegionData.sectionData.map(({ name, images, id }, i) => (
              <RegionsCard
                key={id}
                id={id}
                name={name}
                image={images[0]?.url}
                handleClick={() => handleRedirectToRegionDetails(id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RegionsHomeList;
