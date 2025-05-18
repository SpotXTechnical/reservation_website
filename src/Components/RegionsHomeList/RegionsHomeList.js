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
    if (subRegionData.type === "subregion") {
      router.push(`/subRegions/${id}`);
    } else {
      router.push(`/regions/${id}`);
    }
  };

  return (
    <div className="tw-w-full tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-6">
      <div className="tw-mb-10">
        <Title text={subRegionData.title} />
      </div>

      <div className="tw-pb-4">
        <div className="tw-flex tw-gap-3  md:tw-gap-6 tw-overflow-x-auto tw-pb-4 tw-pt-2 tw-px-2">
          {subRegionData.sectionData?.length > 0 &&
            subRegionData.sectionData.map(({ name, images, id }) => (
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
