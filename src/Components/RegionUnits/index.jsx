import { getUnitsPerRegion, getAllUnits } from "../../app/Apis/UnitsApis";
import { useEffect, useState } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import PopularCard from "../SharedComponents/PopularCard/PopularCard";

const RegionUnits = ({ regionId, className }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (regionId) {
      getUnitsPerRegion(regionId).then((res) => setData(res.data));
    } else {
      getAllUnits().then((res) => setData(res.data));
    }
  }, [regionId]);

  return (
    <div className={`${className}`}>
      {Object.keys(data).length > 0 ? (
        data.map((unit, i) => {
          return (
            <PopularCard
              key={i}
              id={unit.id}
              title={unit.title}
              image={unit.images[0]?.url}
              default_price={unit.default_price}
              bathrooms={unit.bathrooms}
              beds={unit.beds}
              type={unit.type}
              is_favourite={unit.is_favourite}
              active_ranges={unit.active_ranges}
              nearest_active_ranges={unit.nearest_active_ranges}
            />
          );
        })
      ) : (
        <>
          {[...Array(4)].map((e, i) => (
            <ShimmerThumbnail key={i} height={250} rounded />
          ))}
        </>
      )}
    </div>
  );
};

export default RegionUnits;
