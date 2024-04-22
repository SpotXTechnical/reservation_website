"use client";
import { getRegions } from "../../app/Apis/HomeApis";
import { useEffect, useState } from "react";
import RegionsCard from "../SharedComponents/RegionsCard/RegionsCard";
import Title from "../SharedComponents/Title/Title";
import ViewAll from "../SharedComponents/ViewAll/ViewAll";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const RegionsHomeList = () => {
  const router = useRouter();
  const intl = useIntl();
  const [data, setData] = useState([]);
  let { lang } = useSelector((state) => state.language);
  useEffect(() => {
    getRegions().then((res) => setData(res.data?.slice(0, 4)));
  }, [lang]);
  const handleRedirectToRegionDetails = (id) => {
    router.push(`/regions/${id}`);
  };
  return (
    <div className="regionsList_container">
      <div className="regionsList_header">
        <Title text={intl.formatMessage({ id: "home.destinations" })} />
        {/* <ViewAll /> */}
      </div>
      <div className="regionsList_wrapper">
        <div className="regionsList">
          {data?.length > 0
            ? data.map(({ name, images, id }, i) => (
                <RegionsCard
                  key={id}
                  id={i}
                  name={name}
                  image={images[0]?.url}
                  handleClick={() => handleRedirectToRegionDetails(id)}
                />
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
