import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { FormattedMessage, useIntl } from "react-intl";
import {
  getAllUnits,
  getFilterConfig,
  getUnitsPerRegion,
  getUnitsPerRegions,
} from "../../app/Apis/UnitsApis";
import { ShimmerThumbnail } from "react-shimmer-effects";
import RegionUnits from "../../Components/RegionUnits";
import InputSelect from "../../Components/SharedComponents/InputSelect";
import Radio from "../../Components/SharedComponents/Radio";
import { getMostPopularRegions, getRegions } from "../../app/Apis/RegionsApis";
import Checkbox from "../../Components/SharedComponents/Checkbox";
import CheckboxList from "../../Components/SharedComponents/Checkbox/List";
import PriceRangeComponent from "../../Components/SharedComponents/InputRange";
import Pagination from "../../Components/SharedComponents/Pagination";
import PopularCard from "../../Components/SharedComponents/PopularCard/PopularCard";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";

const Reservations = () => {
  const intl = useIntl();
  const WITH_SUB_REGION = 1;
  const [data, setData] = useState("");
  const [mainRegions, setMainRegions] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [filters, setFilters] = useState({
    type: [],
    regions: [],
    subRegions: [],
    rooms: [],
    beds: [],
  });
  const [filterValues, setFilterValues] = useState({
    type: [],
    regions: [],
    subRegions: [],
    rooms: [],
    beds: [],
    minPrice: 0,
    maxPrice: 5000,
  });
  const [sortFilters, setSortFilters] = useState([
    { value: "Option 1", checked: false },
    { value: "Option 2", checked: false },
    { value: "Option 3", checked: false },
  ]);
  const [priceRange, setPriceRange] = useState([0, 5000]);

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
      getAllUnits().then((res) => {
        setData(res.data);
      });

      getFilterConfig().then((res) => {
        let { types, max_rooms, max_beds } = res.data;
        types = types?.map((type, i) => ({
          value: type.value,
          label: type.name,
          checked: false,
        }));
        const rooms = Array(max_rooms)
          .fill()
          .map((_, index) => ({
            value: index + 1,
            label: index + 1,
            checked: false,
          }));
        const beds = Array(max_beds)
          .fill()
          .map((_, index) => ({
            value: index + 1,
            label: index + 1,
            checked: false,
          }));
        setFilters((prevFilters) => ({
          ...prevFilters,
          ["type"]: [
            {
              value: "all",
              label: intl.formatMessage({ id: "all" }),
              checked: false,
            },
            ...types,
          ],
          ["rooms"]: [
            {
              value: "all",
              label: intl.formatMessage({ id: "all" }),
              checked: false,
            },
            ...rooms,
          ],
          ["beds"]: [
            {
              value: "all",
              label: intl.formatMessage({ id: "all" }),
              checked: false,
            },
            ...beds,
          ],
        }));
      });

      getRegions(0).then((res) => {
        const regions = res.data?.map((region, i) => ({
          value: region.id,
          label: region.name,
          checked: false,
        }));
        setFilters((prevFilters) => ({
          ...prevFilters,
          ["regions"]: regions,
        }));
      });

      // getMostPopularRegions()
      // 	.then(res => {
      // 		console.log("eeeeeeeeeh",res)
      // 		const regions = res.data?.map((region, i) => ({ value: region.id, label: region.name, checked: false }))
      // 		setFilters(prevFilters => ({
      // 			...prevFilters,
      // 			["regions"]: regions,
      // 		}));
      // 	})

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

  function getCheckedOption(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].checked === true) {
        return data[i].value;
      }
    }
    return null;
  }

  useEffect(() => {
    setData("");
    let order_by = "";
    let order_type = "";
    if (sortFilters) {
      const checkedOption = getCheckedOption(sortFilters);
      switch (checkedOption) {
        case "Option 2":
          order_by = "default_price";
          order_type = "asc";
          break;
        case "Option 3":
          order_by = "default_price";
          order_type = "desc";
          break;
        case "Option 1":
          order_by = "created_at";
          order_type = "desc";
          break;
      }
    }
    const clonedFilterValues = { ...filterValues };
    if (clonedFilterValues.type.includes("all")) {
      clonedFilterValues.type = [];
    }
    getAllUnits({ ...clonedFilterValues, order_type, order_by }).then((res) => {
      setData(res.data);
    });
  }, [filterValues, sortFilters, lang]);

  const onSearch = (values) => {
    setData("");
    values = values.map((region, i) => region.value);
    getUnitsPerRegions(values).then((res) => {
      setData(res.data);
    });
  };

  const onSubRegionSearch = ({ value }) => {
    // getUnitsPerRegion(value)
    // 	.then(res => {
    // 		setData(res.data)
    // 	})
  };

  const handleChange = (index) => {
    const updatedFilters = [...sortFilters]; // Create a copy of the current filters array

    // Update the selected radio button's status
    updatedFilters[index].checked = true;

    // Reset the status of the other radio buttons
    for (let i = 0; i < updatedFilters.length; i++) {
      if (i !== index) {
        updatedFilters[i].checked = false;
      }
    }

    setSortFilters(updatedFilters); // Update the state with the new filters
  };

  const handlePriceAfterChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      ["minPrice"]: newPriceRange[0],
      ["maxPrice"]: newPriceRange[1],
    }));
  };

  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const handleCheckboxChange = (index, filterKey) => {
    const updatedFilters = [...filters[filterKey]]; // Create a copy of the current filters array
    const checkbox = updatedFilters[index];
    // console.log(checkbox, updatedFilters, "updatedFilters")
    checkbox.checked = !checkbox.checked;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: updatedFilters,
    })); // Update the state with the new filters

    handleFilterChange(filterKey, checkbox);
  };

  const handleFilterChange = (filterKey, checkbox) => {
    const values = filterValues[filterKey]; // Get the current filter values
    const updatedValues = checkbox.checked
      ? [...values, checkbox.value] // Add the checkbox value
      : values.filter((value) => value !== checkbox.value); // Remove the checkbox value

    setFilterValues((prevFilters) => ({
      ...prevFilters,
      [filterKey]: updatedValues,
    }));

    // getAllUnits(filterValues)
    // 	.then(res => {
    // 		setData(res.data)
    // 	})
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`d-flex ${styles.container}`}
    >
      {/* {console.log(filters, filterValues)} */}
      <div className={`d-flex flex-column ${styles.filters}`}>
        <div className={`w-100 mb-5 ${styles.sort_section}`}>
          <h4 className="mb-4">
            <img src="assets/sortIcon.png" alt="sort" className="me-2" />
            <FormattedMessage id="sort" />
          </h4>
          {sortFilters.map((item, index) => {
            return (
              <Radio
                key={index}
                value={item.value}
                checked={item.checked}
                handleChange={() => handleChange(index)}
                // className={`${styles.filter_radio}`}
                label={
                  <FormattedMessage
                    id={`filters.sort.checkbox${index + 1}.label`}
                  />
                }
              />
            );
          })}
        </div>

        <div className={`w-100 ${styles.filter_section}`}>
          <h4 className="mb-4 d-flex justify-content-between">
            <span>
              <img src="assets/filter.png" alt="sort" className="me-2" />
              <FormattedMessage id="filter" />
            </span>
            <span>
              <FormattedMessage id="reset" />
            </span>
          </h4>

          <div className={`mb-3 ${styles.hometype}`}>
            <p className={`mb-2 subtitle`}>
              <FormattedMessage id="homeType" />
            </p>
            {filters.type?.map((item, index) => {
              return (
                <Checkbox
                  key={index}
                  value={item.value}
                  checked={item.checked}
                  handleChange={() => handleCheckboxChange(index, "type")}
                  // className={`${styles.filter_radio}`}
                  label={item.label}
                />
              );
            })}
            {/* <CheckboxList 
							list={filters.hometype}
							handleChange={() => handleCheckboxChange(index, "hometype")}
							/> */}
          </div>

          <div className={`mb-3 ${styles.regions}`}>
            <p className={`mb-2 subtitle`}>
              <FormattedMessage id="regions" />
            </p>
            {filters.regions?.map((item, index) => {
              return (
                <Checkbox
                  key={index}
                  value={item.value}
                  checked={item.checked}
                  handleChange={() => handleCheckboxChange(index, "regions")}
                  // className={`${styles.filter_radio}`}
                  label={item.label}
                />
              );
            })}

            <div className={`mb-3 mt-4 ${styles.sub_regions}`}>
              <p className={`mb-2 subtitle`}>
                <FormattedMessage id="subRegions" />
              </p>
              <div
                className={`${styles.search_container} d-inline-block w-100`}
              >
                <InputSelect
                  isMulti={true}
                  className={`${styles.search_input}`}
                  onChange={onSubRegionSearch}
                  hideIndecators={false}
                  placeholder={
                    <FormattedMessage id="dicover.subRegions.search.placeholder" />
                  }
                />
              </div>
            </div>
          </div>

          <div className={`mb-3 ${styles.rooms}`}>
            <p className={`mb-2 subtitle`}>
              <FormattedMessage id="roomsNum" />
            </p>
            <div className={`d-flex flex-wrap`}>
              {filters.rooms?.map((item, index) => {
                return (
                  <Checkbox
                    key={index}
                    value={item.value}
                    checked={item.checked}
                    handleChange={() => handleCheckboxChange(index, "rooms")}
                    label={item.label}
                  />
                );
              })}
            </div>
          </div>

          <div className={`mb-3 ${styles.beds}`}>
            <p className={`mb-2 subtitle`}>
              <FormattedMessage id="bedsNum" />
            </p>
            <div className={`d-flex flex-wrap`}>
              {filters.beds?.map((item, index) => {
                return (
                  <Checkbox
                    key={index}
                    value={item.value}
                    checked={item.checked}
                    handleChange={() => handleCheckboxChange(index, "beds")}
                    label={item.label}
                  />
                );
              })}
            </div>
          </div>

          <div className={`mb-3 ${styles.price_range}`}>
            <p className={`mb-2 subtitle`}>
              <FormattedMessage id="price" />
            </p>
            {console.log("priceRangepriceRangepriceRange", priceRange)}
            <div className={`d-flex`}>
              <PriceRangeComponent
                min={0}
                max={5000}
                step={1}
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
                handlePriceAfterChange={handlePriceAfterChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.discover_container}`}>
        <div className={`${styles.discover}`}>
          <p className={`text-center ${styles.heading_title}`}>
            <FormattedMessage id="discoverAndbook" />
          </p>
          <div className={`${styles.search_container} d-inline-block w-100`}>
            <InputSelect
              onChange={onSearch}
              hideIndecators={true}
              isMulti={true}
              options={mainRegions}
              placeholder={
                <>
                  <img
                    className={styles.heading_search_icon}
                    src="/assets/search-normal.png"
                    alt="search"
                  />
                  <FormattedMessage id="dicover.search.placeholder" />
                </>
              }
            />
          </div>
        </div>
        <div className={`mt-3 ${styles.units_list}`}>
          <p className="head">
            <FormattedMessage id="discoverAndbook" />
          </p>
          {/* {
						data && <RegionUnits className={styles.units_container} />
					} */}
          {!data ? (
            <div className={styles.shimmer_wrapper}>
              {" "}
              {[...Array(4)].map((e, i) => (
                <div className={styles.shimmer}  key={i}>
                  <ShimmerThumbnail key={i} height={250} rounded />
                </div>
              ))}
            </div>
          ) : data.length > 0 ? (
            <div className={styles.units_container}>
              {data.map((unit, i) => {
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
              })}
            </div>
          ) : (
            <p className={styles.not_found}>
              <FormattedMessage id="noDataFound" />
            </p>
          )}
        </div>
      </div>
      {/* <Pagination links={}/> */}
    </div>
  );
};

export default Reservations;
