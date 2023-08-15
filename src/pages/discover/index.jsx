import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  getAllUnits,
  getFilterConfig,
  getAllSubRegions,
  getFavouriteList,
} from "../../app/Apis/UnitsApis";
import { ShimmerThumbnail } from "react-shimmer-effects";
import InputSelect from "../../Components/SharedComponents/InputSelect";
import Radio from "../../Components/SharedComponents/Radio";
import { getRegions } from "../../app/Apis/RegionsApis";
import Checkbox from "../../Components/SharedComponents/Checkbox";
import PriceRangeComponent from "../../Components/SharedComponents/InputRange";
import Pagination from "../../Components/SharedComponents/Pagination";
import PopularCard from "../../Components/SharedComponents/PopularCard/PopularCard";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";

const Reservations = () => {
  const intl = useIntl();
  const WITH_SUB_REGION = 1;
  const [data, setData] = useState("");
  const [meta, setMeta] = useState("");
  const [mainRegions, setMainRegions] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [subRegions, setSubRegions] = useState([]);
  const [page, setPage] = useState(1);
  const [favourites, setFav] = useState([]);
  const [filters, setFilters] = useState({
    // type: [],
    regions: [],
    subRegions: [],
    rooms: [],
    beds: [],
  });
  const [filterValues, setFilterValues] = useState({
    // type: [],
    regions: [],
    subRegions: [],
    rooms: [],
    beds: [],
    minPrice: 0,
    maxPrice: 50000,
  });
  const [sortFilters, setSortFilters] = useState([
    { value: "Option 1", checked: false },
    { value: "Option 2", checked: false },
    { value: "Option 3", checked: false },
  ]);
  const [priceRange, setPriceRange] = useState([0, 0]);

  let { lang } = useSelector((state) => state.language);
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }
  const handlePagination = (page) => {
    const PAGE = page.selected + 1;
    setPage(PAGE);
  };
  useEffect(() => {
    getFavouriteList().then((res) => setFav(res?.data));
  }, []);

  useEffect(
    function () {
      getAllUnits(null, page).then((res) => {
        setData(res.data);
        setMeta(res.meta);
      });

      getFilterConfig().then((res) => {
        let { types, max_rooms, max_beds, min_price, max_price } = res.data;
        setMinPrice(min_price);
        setMaxPrice(max_price);
        setPriceRange([min_price, max_price]);
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
              checked: true,
            },
            ...types,
          ],
          ["rooms"]: [
            {
              value: "all",
              label: intl.formatMessage({ id: "all" }),
              checked: true,
            },
            ...rooms,
          ],
          ["beds"]: [
            {
              value: "all",
              label: intl.formatMessage({ id: "all" }),
              checked: true,
            },
            ...beds,
          ],
        }));
      });

      getRegions(1).then((res) => {
        let regions = res.data?.map((region, i) => ({
          value: region.id,
          label: region.name,
          checked: false,
          sub_regions: region.sub_regions,
        }));
        const regionValues = regions?.map((region) => region.value);
        getAllSubRegions(regionValues).then((res) => {
          const subRegions = res.data?.map((region, i) => ({
            value: region.id,
            label: region.name,
            checked: false,
          }));
          const subRegionValues = subRegions?.map(
            (subRegion) => subRegion.value
          );
          setFilters((prevFilters) => ({
            ...prevFilters,
            ["subRegions"]: subRegions,
          }));
        });

        setFilters((prevFilters) => ({
          ...prevFilters,
          ["regions"]: regions,
        }));
      });

      // getMostPopularRegions()
      // 	.then(res => {
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
  const handleUpdateFavList = () => {
    getFavouriteList().then((res) => setFav(res?.data));
  };

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
    if (filterValues?.regions?.length > 0) {
      getAllSubRegions(filterValues?.regions).then((res) => {
        let results = [];
        res?.data?.map((subRegion) => {
          results.push({ value: subRegion.id, label: subRegion.name });
        });
        setSubRegions(results);
      });
    } else {
      setSubRegions([]);
    }
    const clonedFilterValues = { ...filterValues };
    getAllUnits({ ...clonedFilterValues, order_type, order_by }, page).then(
      (res) => {
        setData(res.data);
        setMeta(res.meta);
      }
    );
  }, [filterValues, sortFilters, lang, page]);

  const onSearch = (values) => {
    setData("");
    values = values.map((region, i) => region.value);
    const updatedRegions = [...filters.regions]?.map((region) => {
      if (values.includes(region.value)) {
        return {
          ...region,
          checked: true,
        };
      }
      return {
        ...region,
        checked: false,
      };
    });
    const updatedSubRegions = [...filters.subRegions]?.map((region) => {
      if (values.includes(region.value)) {
        return {
          ...region,
          checked: true,
        };
      }
      return {
        ...region,
        checked: false,
      };
    });
    setFilters((prevFilters) => ({
      ...prevFilters,
      ["regions"]: updatedRegions,
      ["subRegions"]: updatedSubRegions,
    }));

    let results = [...values];

    updatedSubRegions.forEach((subRegion) => {
      if (subRegion.checked) {
        const subRegionParent = updatedRegions.find((r) =>
          r.sub_regions.some((sub) => sub.id === subRegion.value)
        );

        if (subRegionParent) {
          const parentIndex = results.indexOf(subRegionParent.value);
          if (parentIndex !== -1) {
            results.splice(parentIndex, 1);
          }
        }
      }
    });

    setFilterValues((prevFilters) => ({
      ...prevFilters,
      ["regions"]: [...new Set([...results])],
    }));
  };

  const onSubRegionSearch = (values) => {
    setData("");
    values = values.map((region, i) => region.value);
    const updatedSubRegions = [...filters.subRegions]?.map((region) => {
      if (values.includes(region.value)) {
        return {
          ...region,
          checked: true,
        };
      }
      return {
        ...region,
        checked: false,
      };
    });
    setFilters((prevFilters) => ({
      ...prevFilters,
      ["subRegions"]: updatedSubRegions,
    }));
    const getRegionsOnly = (prevRegions) => {
      const uncheckedIds = updatedSubRegions
        .filter(
          (item) => item.checked === false && prevRegions?.includes(item.value)
        )
        .map((item) => item.value);

      const filteredRegions = prevRegions.filter(
        (id) => !uncheckedIds.includes(id)
      );

      return filteredRegions;
    };

    let results = [...values];

    setFilterValues((prevFilters) => {
      let results = [
        ...new Set(getRegionsOnly([...values, ...prevFilters.regions])),
      ];
      updatedSubRegions.forEach((subRegion) => {
        if (subRegion.checked) {
          const subRegionParent = [...filters.regions].find((r) =>
            r.sub_regions.some((sub) => sub.id === subRegion.value)
          );

          if (subRegionParent) {
            const parentIndex = results.indexOf(subRegionParent.value);
            if (parentIndex !== -1) {
              results.splice(parentIndex, 1);
            }
          }
        }
      });
      return {
        ...prevFilters,
        ["regions"]: results,
      };
    });
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

  const handleResetFilters = () => {};

  const handleCheckboxChange = (index, filterKey) => {
    const updatedFilters = [...filters[filterKey]]; // Create a copy of the current filters array
    const checkbox = updatedFilters[index];
    checkbox.checked = !checkbox.checked;
    if (
      (filterKey === "rooms" || filterKey === "beds") &&
      index !== 0 &&
      checkbox.checked
    ) {
      updatedFilters[0].checked = false;
    } else {
      if (
        (filterKey === "rooms" || filterKey === "beds") &&
        index === 0 &&
        checkbox.checked
      ) {
        updatedFilters.map((filter, i) => {
          filter.checked = false;
        });
        updatedFilters[0].checked = true;
      }
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: updatedFilters,
    })); // Update the state with the new filters

    handleFilterChange(filterKey, checkbox);
  };

  const handleFilterChange = (filterKey, checkbox) => {
    const values = filterValues[filterKey]; // Get the current filter values

    const updatedValues =
      checkbox.value === "all" &&
      (filterKey === "rooms" || filterKey === "beds")
        ? checkbox.checked
          ? []
          : [...values]
        : checkbox.checked
        ? [...values, checkbox.value] // Add the checkbox value
        : values.filter((value) => value !== checkbox.value); // Remove the checkbox value

    setFilterValues((prevFilters) => ({
      ...prevFilters,
      [filterKey]: updatedValues,
    }));
  };

  const getSubRegionsValues = () => {
    const results = [...filters.subRegions]?.filter((region) => {
      if (region?.checked) {
        return region;
      }
    });
    return results;
  };

  const getRegionsValues = () => {
    const results = [...filters.subRegions, ...filters?.regions]?.filter(
      (region) => {
        if (region?.checked) {
          return region;
        }
      }
    );
    return results;
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`d-flex discover_wrapper`}
    >
      <div className={`d-flex flex-column filters`}>
        <div className={`w-100 mb-5 sort_section`}>
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

        <div className={`w-100 filter_section`}>
          <h4 className="mb-4 d-flex justify-content-between">
            <span>
              <img src="assets/filter.png" alt="sort" className="me-2" />
              <FormattedMessage id="filter" />
            </span>
            <span className="cursor-pointer" onClick={handleResetFilters}>
              {/* <FormattedMessage id="reset" /> */}
            </span>
          </h4>

          {/* <div className={`mb-3 ${styles.hometype}`}>
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
            })} */}
          {/* <CheckboxList 
							list={filters.hometype}
							handleChange={() => handleCheckboxChange(index, "hometype")}
							/> */}
          {/* </div> */}

          <div className={`mb-3 regions`}>
            <p className={`mb-2 subtitle`}>
              <FormattedMessage id="profile.edit.fields.city.label" />
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

            <div className={`mb-3 mt-4 sub_regions`}>
              <p className={`mb-2 subtitle`}>
                <FormattedMessage id="Resort / Region" />
              </p>
              <div className={`search_container d-inline-block w-100`}>
                <InputSelect
                  value={getSubRegionsValues()}
                  isMulti={true}
                  options={subRegions}
                  className="search_input"
                  onChange={onSubRegionSearch}
                  hideIndecators={false}
                  placeholder={
                    <FormattedMessage id="dicover.subRegions.search.placeholder" />
                  }
                />
              </div>
            </div>
          </div>

          <div className={`mb-3 rooms`}>
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

          <div className={`mb-3 beds`}>
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

          <div className={`mb-3 price_range`}>
            <p className={`mb-2 subtitle`}>
              <FormattedMessage id="price" />
            </p>
            <div className={`d-flex`}>
              <PriceRangeComponent
                min={minPrice}
                max={maxPrice}
                step={1}
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
                handlePriceAfterChange={handlePriceAfterChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="discover_container">
        <div className="discover">
          <p className={`text-center heading_title`}>
            <FormattedMessage id="discoverAndbook" />
          </p>
          <div className={`search_container d-inline-block w-100`}>
            <InputSelect
              value={getRegionsValues()}
              onChange={onSearch}
              hideIndecators={true}
              isMulti={true}
              options={mainRegions}
              placeholder={
                <>
                  <img
                    className="heading_search_icon"
                    src="/assets/search-normal.png"
                    alt="search"
                  />
                  <FormattedMessage id="dicover.search.placeholder" />
                </>
              }
            />
          </div>
        </div>
        <div className={`mt-3 units_list`}>
          <p className="head">
            <FormattedMessage id="discoverAndbook" />
          </p>
          {/* {
						data && <RegionUnits className={styles.units_container} />
					} */}
          {!data ? (
            <div className="shimmer_wrapper">
              {" "}
              {[...Array(4)].map((e, i) => (
                <div className="shimmer" key={i}>
                  <ShimmerThumbnail key={i} height={250} rounded />
                </div>
              ))}
            </div>
          ) : data.length > 0 ? (
            <div className="units_container">
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
                    updateFavList={handleUpdateFavList}
                    favouritesList={favourites}
                  />
                );
              })}
            </div>
          ) : (
            <p className="not_found">
              <FormattedMessage id="noDataFound" />
            </p>
          )}
        </div>
        {meta && <Pagination meta={meta} handlePagination={handlePagination} />}
      </div>
      <div></div>
    </div>
  );
};

export default Reservations;
