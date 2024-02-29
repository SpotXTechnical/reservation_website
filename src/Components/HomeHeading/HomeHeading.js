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
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }

  const onSearch = () => {
    router.push("/discover");
  };

  useEffect(
    function () {
      getRegions(WITH_SUB_REGION).then((res) => {
        let results = [];
        res.data?.map((region, i) => {
          results.push({ value: region.id, label: region.name });

          if (region?.sub_regions && region?.sub_regions.length > 0) {
            region?.sub_regions.forEach((subRegion) => {
              results.push({ value: subRegion.id, label: subRegion.name });
            });
          }
        });
        setMainRegions(results);
      });
    },
    [lang]
  );
  return (
    <div className="home_heading_bg">
      <h1 className="heading_main_title" style={{ fontWeight: 600 }}>
        <FormattedMessage id="home.headingMainTitle" />
      </h1>
      <div className="heading_search_input_wrapper">
        {/* <img
          className={styles.heading_search_icon}
          src="/assets/search-normal.png"
          alt="search"
        ></img> */}
        <div className={`search_container d-inline-block`}>
          <InputSelect
            onChange={onSearch}
            hideIndecators={true}
            isMulti={true}
            options={mainRegions}
            value={[]}
            placeholder={
              <>
                <img
                  className="heading_search_icon"
                  src="/assets/search-normal.png"
                  alt="search"
                />
                <FormattedMessage id="home.searchForYourDestination" />
              </>
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
          className="heading_btn"
        />
      </div>
    </div>
  );
};

export default HomeHeading;
