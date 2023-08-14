import { useEffect, useState } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { useRouter } from "next/router";
import { getRegionDetails } from "../../app/Apis/RegionsApis";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RegionUnits from "../../Components/RegionUnits";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";
import { FormattedMessage } from "react-intl";
import Pagination from "../../Components/SharedComponents/Pagination";

export default function SubRegion() {
  const router = useRouter();
  const [meta, setMeta] = useState("");
  const { id } = router.query;
  const [data, setData] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [page, setPage] = useState(1);

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
        getRegionDetails(id, null, page).then((res) => {
          setData(res.data);
          setMeta(res.meta);
        });
      }
    },
    [id, lang, page]
  );

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}?idKey=${id}&targetKey=subRegion`
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handlePagination = (page) => {
    const PAGE = page.selected + 1;
    setPage(PAGE);
  };

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="subregions_container">
      <>
        {data?.images ? (
          <div className={`flex-center head`}>
            <Carousel showThumbs={false} showStatus={false} emulateTouch={true}>
              {data?.images?.map((slide) => (
                <div key={slide.id}>
                  <div
                    className="carousel_img"
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
            <h2 className="region_name">{data.name}</h2>
            <span className="share" onClick={handleShare}>
              {!isCopied && <img src="/assets/share.png" alt="share" />}
              <span>
                {isCopied ? (
                  <span className="copied_link">
                    <FormattedMessage id="link copied" />{" "}
                  </span>
                ) : (
                  <FormattedMessage id="share" />
                )}
              </span>
            </span>
          </div>
        )}
        {Object.keys(data)?.length > 0 ? (
          <RegionUnits
            regionId={id}
            isSub={true}
            className={`container_wrapper units_container`}
          />
        ) : (
          <div className="shimmer_wrapper">
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
      {meta && <Pagination meta={meta} handlePagination={handlePagination} />}
    </div>
  );
}
