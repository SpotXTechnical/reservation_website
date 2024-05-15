import { useEffect, useState } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { useRouter } from "next/router";
import { getRegionDetails } from "../../app/Apis/RegionsApis";
import { Carousel } from "react-responsive-carousel";
import RegionUnits from "../../Components/RegionUnits";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";
import { FormattedMessage } from "react-intl";
import Pagination from "../../Components/SharedComponents/Pagination";
import { getFaqs } from "../../app/Apis/Faqs";
import Head from "next/head";

export default function SubRegion() {
  const router = useRouter();
  const { id } = router.query;
  const [faqs, setFaqs] = useState(null);
  const [data, setData] = useState({});
  const [isCopied, setIsCopied] = useState(false);

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
        getRegionDetails(id, null).then((res) => {
          setData(res.data);
        });
      }
    },
    [id, lang]
  );
  useEffect(() => {
    if (id) {
      getFaqs({
        questionable_id: id,
        questionable_type: "sub_region",
      }).then((response) => {
        setFaqs(response.data);
      });
    }
  }, [id]);
  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}?idKey=${id}&targetKey=subRegion`
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>{data?.name || "Loading..."} | SpotX</title>
        <meta
          name="description"
          content={data?.description || "Best Place to chill out"}
        />
      </Head>
      <main
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="subregions_container"
      >
        <>
          {data?.images ? (
            <div className={`flex-center head`}>
              <Carousel
                showThumbs={false}
                showStatus={false}
                emulateTouch={true}
              >
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
            <div className="d-flex flex-column gap-2 gap-md-0 flex-md-row justify-content-center mt-5 mb-3 align-items-center">
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
              className={`container_wrapper gap-4 justify-content-center units_container mb-0 p-3`}
            />
          ) : (
            <div className="container_wrapper gap-4 justify-content-center units_container mb-0 p-3`">
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

        {/* FAQ SECTION */}
        <div className="col-md-12 container_wrapper mb-5 p-3">
          <div className="accordion" id="accordionExample">
            <h3 className="mb-3">FAQs</h3>
            {faqs &&
              faqs.length > 0 &&
              faqs.map((faq) => {
                return (
                  <div className="accordion-item" key={faq.id}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${faq.id}`}
                        aria-expanded="true"
                        aria-controls={`collapse${faq.id}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse${faq.id}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          {faqs && faqs.length === 0 && (
            <section className="d-felx   flex-column">
              <p
                className="badge faq_emptyMessage text-break"
                style={{ fontSize: "12px" }}
              >
                There&apos;s no FAQs for this Sub-region.
              </p>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
