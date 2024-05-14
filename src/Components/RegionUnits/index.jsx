import {
  getUnitsPerRegion,
  getAllUnits,
  getUnitsPerSubRegion,
  getFavouriteList,
} from "../../app/Apis/UnitsApis";
import { useEffect, useState } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import PopularCard from "../SharedComponents/PopularCard/PopularCard";
import Pagination from "../Pagination/Pagination";

const RegionUnits = ({ regionId, className, isSub }) => {
  const [data, setData] = useState([]);
  const [favourites, setFav] = useState([]);
  const [meta, setMeta] = useState("");

  useEffect(() => {
    isSub
      ? getUnitsPerSubRegion(regionId).then((res) => {
          setMeta(res.meta);
          setData(res.data);
        })
      : getUnitsPerRegion(regionId).then((res) => {
          setMeta(res.meta);
          setData(res.data);
        });
  }, [isSub, regionId]);

  useEffect(() => {
    handleUpdateFavList();
  }, []);

  const handleUpdateFavList = () => {
    getFavouriteList().then((res) => setFav(res?.data));
  };
  const handlePagination = async (pageNumber) => {
    setData([]);
    isSub
      ? getUnitsPerSubRegion(regionId, { page: pageNumber }).then((res) => {
          setData(res.data);
        })
      : getUnitsPerRegion(regionId).then((res) => {
          setData(res.data);
        });
  };

  return (
    <>
      <div className={`${className} mb-0`}>
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
                favouritesList={favourites}
                updateFavList={handleUpdateFavList}
                total_price={unit.total_price}
                current_price={unit.current_price}
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
      {meta && (
        <Pagination lastPage={meta?.last_page} callBack={handlePagination} />
      )}
    </>
  );
};

export default RegionUnits;
