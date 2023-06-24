import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { useRouter } from "next/router";
import { getRegionDetails } from "../../app/Apis/RegionsApis";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RegionUnits from "../../Components/RegionUnits";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";

export default function SubRegion() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  let { lang } = useSelector((state) => state.language);
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }
  useEffect(
    function () {
      if (id) {
        getRegionDetails(id).then((res) => {
          setData(res.data);
        });
      }
    },
    [id, lang]
  );

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={styles.regions_container}
    >
      <>
        {data?.images ? (
          <div className={`flex-center ${styles.head}`}>
            <Carousel showThumbs={false} showStatus={false} emulateTouch={true}>
              {data?.images?.map((slide) => (
                <div key={slide.id}>
                  <div
                    className={styles.carousel_img}
                    style={{ backgroundImage: `url(${slide.url}` }}
                  ></div>
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <ShimmerThumbnail height={500} rounded />
        )}

        {data.name && (
          <div className="d-flex justify-content-center my-5 align-items-center">
            <img
              src="/assets/location.png"
              alt="location-icon"
              width={"24px"}
              height={"30px"}
              className="mx-3"
            />
            <h2 className={styles.region_name}>{data.name}</h2>
          </div>
        )}
        {Object.keys(data)?.length > 0 ? (
          <RegionUnits
            regionId={id}
            className={`container_wrapper ${styles.units_container}`}
          />
        ) : (
          <div className={styles.shimmer_wrapper}>
            {[...Array(4)].map((e, i) => (
              <ShimmerThumbnail key={i} height={250} rounded />
            ))}
          </div>
        )}

        {/* {(data?.sub_regions?.length > 0 || search!=="" )? (
            <SubRegions
              regionName={data.name}
              subRegions={data.sub_regions}
              withSearch={true}
              handleSearch={handleSearch}
            />
          )  : (
          <div className={styles.shimmer_wrapper}>
            {[...Array(4)].map((e, i) => (
              <ShimmerThumbnail key={i} height={250} rounded />
            ))}
          </div>
        )} */}
      </>
    </div>
  );
}
