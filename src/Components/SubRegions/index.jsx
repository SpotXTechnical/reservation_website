import { useRouter } from "next/router";
import RegionsCard from "../SharedComponents/RegionsCard/RegionsCard";
import { FormattedMessage } from "react-intl";

const SubRegions = ({ regionName, subRegions }) => {
  const router = useRouter();

  return (
    <div className={`container_wrapper`}>
      <div className={`sub_regions_container cursor-pointer`}>
        {subRegions.map((item, i) => (
          <RegionsCard
            id={item.id}
            key={i}
            name={item.name}
            handleClick={() => router.push(`/subRegions/${item.id}`)}
            image={item.images.length ? item.images[0].url : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default SubRegions;
