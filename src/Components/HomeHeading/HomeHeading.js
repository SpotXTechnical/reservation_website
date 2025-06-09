import Input from "../SharedComponents/Input/Input";
import Button from "../SharedComponents/Button/Button";
import { FormattedMessage, useIntl } from "react-intl";
import InputSelect from "../SharedComponents/InputSelect";
import { useEffect, useState } from "react";
import { getRegions } from "../../app/Apis/RegionsApis";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";
import { useRouter } from "next/router";

const HomeHeading = () => {
  const intl = useIntl();
  const router = useRouter();
  const WITH_SUB_REGION = 1;
  const [mainRegions, setMainRegions] = useState([]);

  let { lang } = useSelector((state) => state.language);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      const language = storedLanguage ? storedLanguage : "en";
      store.dispatch(
        language === "ar" ? langAction.langAr() : langAction.langEn()
      );
    }
  }, []);

  const onSearch = (event) => {
    if (event.length) {
      const [{ main, sub, label }] = event;
      if (!sub) {
        router.push(`/discover?main=${main}`);
      } else {
        router.push(`/discover?sub=${sub}&main=${main}`);
      }
    }
  };

  useEffect(
    function () {
      getRegions(WITH_SUB_REGION)
        .then((res) => {
          let results = [];
          res.data?.map((region, i) => {
            results.push({ main: region.id, label: region.name });

            if (region?.sub_regions && region?.sub_regions.length > 0) {
              region?.sub_regions.forEach((subRegion) => {
                results.push({
                  sub: subRegion.id,
                  label: subRegion.name,
                  main: region.id,
                });
              });
            }
          });
          setMainRegions(results);
        })
        .catch((error) => {
          return new Error(error);
        });
    },
    [lang]
  );
  return (
    <div className="home_heading_bg">
      <h1 className="heading_main_title" style={{ fontWeight: 600 }}>
        <FormattedMessage id="home.headingMainTitle" />
      </h1>
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-min-w-[90%] md:tw-min-w-[60%] tw-items-center tw-gap-3 tw-max-w-4xl tw-mx-auto tw-rounded-lg tw-shadow-md tw-bg-white tw-p-3">
        {/* <img
          className={styles.heading_search_icon}
          src="/assets/search-normal.png"
          alt="search"
        ></img> */}
        <div className="tw-flex-grow tw-w-full">
          <InputSelect
            onChange={(e) => onSearch(e)}
            hideIndecators={true}
            isMulti={true}
            options={mainRegions}
            value={[]}
            placeholder={
              <div className="tw-flex tw-items-center tw-gap-2">
                <svg
                  className="tw-w-5 tw-h-5 tw-text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>
                  {intl.formatMessage({ id: "home.searchForYourDestination" })}
                </span>
              </div>
            }
          />
        </div>
        {/* <Input
          className={styles.heading_search_input}
          placeholder={intl.formatMessage({
            id: "home.searchForYourDestination",
          })}
        /> */}
        <Button
          text={intl.formatMessage({ id: "home.search" })}
          className="tw-bg-[#fcd95c] tw-text-[#0c0c0c] tw-font-bold tw-py-3 tw-px-6 tw-rounded-md tw-transition-all tw-duration-200 hover:tw-bg-[#f8ce38] hover:tw-shadow-lg tw-whitespace-nowrap tw-flex tw-items-center tw-justify-center tw-h-12 tw-min-w-[100px] tw-flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default HomeHeading;
