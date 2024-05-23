"use client";
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
import Head from "next/head";
import { useRouter } from "next/router";
import { getUnits } from "../../app/Apis/Discover";
import { useSearchParams } from "next/navigation";

const Reservations = () => {
  const router = useRouter();
  // const { main, sub } = router.query;
  const searchParams = useSearchParams();

  const intl = useIntl();
  const WITH_SUB_REGION = 1;
  const [data, setData] = useState("");
  const [meta, setMeta] = useState("");
  const [mainRegions, setMainRegions] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [favourites, setFav] = useState([]);
  const [filters, setFilters] = useState({
    sortFilters: [],
    regions: [],
    page: [],
    beds: [],
    rooms: [],
  });
  const [filterValues, setFilterValues] = useState({
    rooms: [],
    beds: [],
    minPrice: 0,
    maxPrice: 50000,
    subRegions: [],
    regions: [],
  });
  const [sortFilters, setSortFilters] = useState([
    { value: "latest", checked: false },
    { value: "price_low_high", checked: false },
    { value: "price_high_low", checked: false },
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
    setFilters((prev) => {
      return {
        ...prev,
        page: [["page", PAGE]],
      };
    });
  };

  useEffect(() => {
    getFavouriteList().then((res) => setFav(res?.data));
  }, []);

  // useEffect(
  //   function () {
  //     const { main, sub } = router.query;

  //     // getFilterConfig().then((res) => {
  //     //   let { types, max_rooms, max_beds, min_price, max_price } = res.data;
  //     //   setMinPrice(min_price);
  //     //   setMaxPrice(max_price);
  //     //   setPriceRange([min_price, max_price]);
  //     //   types = types?.map((type, i) => ({
  //     //     value: type.value,
  //     //     label: type.name,
  //     //     checked: false,
  //     //   }));

  //     //   const rooms = Array(max_rooms)
  //     //     .fill()
  //     //     .map((_, index) => ({
  //     //       value: index + 1,
  //     //       label: index + 1,
  //     //       checked: false,
  //     //     }));

  //     //   const beds = Array(max_beds)
  //     //     .fill()
  //     //     .map((_, index) => ({
  //     //       value: index + 1,
  //     //       label: index + 1,
  //     //       checked: false,
  //     //     }));

  //     //   setFilters((prevFilters) => ({
  //     //     ...prevFilters,
  //     //     ["type"]: [
  //     //       {
  //     //         value: "all",
  //     //         label: intl.formatMessage({ id: "all" }),
  //     //         checked: true,
  //     //       },
  //     //       ...types,
  //     //     ],
  //     //     ["rooms"]: [
  //     //       {
  //     //         value: "all",
  //     //         label: intl.formatMessage({ id: "all" }),
  //     //         checked: true,
  //     //       },
  //     //       ...rooms,
  //     //     ],
  //     //     ["beds"]: [
  //     //       {
  //     //         value: "all",
  //     //         label: intl.formatMessage({ id: "all" }),
  //     //         checked: true,
  //     //       },
  //     //       ...beds,
  //     //     ],
  //     //   }));
  //     // });

  // getRegions(1).then((res) => {
  //   let regions = res.data?.map((region, i) => ({
  //     value: region.id,
  //     label: region.name,
  //     checked: Number(router.query?.main) === region.id,
  //     sub_regions: region.sub_regions,
  //   }));
  //   const regionValues = regions?.map((region) => region.value);
  //   getAllSubRegions(regionValues).then((res) => {
  //     const subRegions = res.data?.map((region, i) => ({
  //       value: region.id,
  //       label: region.name,
  //       checked: Number(router.query?.sub) === region.id,
  //     }));
  //     const subRegionValues = subRegions?.map(
  //       (subRegion) => subRegion.value
  //     );
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       ["subRegions"]: subRegions,
  //     }));
  //   });

  //     //   setFilters((prevFilters) => ({
  //     //     ...prevFilters,
  //     //     ["regions"]: regions,
  //     //   }));
  //     // });
  //     // getRegions(WITH_SUB_REGION).then((res) => {
  //     //   let results = [];
  //     //   res.data?.map((region, i) => {
  //     //     results.push({ value: region.id, label: region.name });

  //     //     if (region?.sub_regions && region?.sub_regions.length > 0) {
  //     //       region?.sub_regions.forEach((subRegion) => {
  //     //         results.push({ value: subRegion.id, label: subRegion.name });
  //     //       });
  //     //     }
  //     //   });
  //     //   setMainRegions(results);
  //     // });
  //     // }
  //   },
  //   [intl, lang, page, router.query]
  // );

  // Effect for beds and rooms
  useEffect(() => {
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

      setFilterValues((prevFilters) => ({
        ...prevFilters,
        rooms: [
          {
            value: "all",
            label: intl.formatMessage({ id: "all" }),
            checked: true,
          },
          ...rooms,
        ],
        beds: [
          {
            value: "all",
            label: intl.formatMessage({ id: "all" }),
            checked: true,
          },
          ...beds,
        ],
      }));
    });
  }, [intl]);

  // Effect for query params which is based from home page
  useEffect(() => {
    const main = searchParams.get("main");
    const sub = searchParams.get("sub");
    if (main || sub) {
      setFilters((prev) => {
        const newRegions = sub ? [["regions[]", sub]] : [["regions[]", main]];

        return {
          ...prev,
          regions: newRegions,
        };
      });
      getRegions(1).then((res) => {
        let regions = res.data?.map((region) => ({
          value: region.id,
          label: region.name,
          checked: Number(main) === region.id,
          sub_regions: region.sub_regions,
        }));
        regions.unshift({
          value: "all",
          label: intl.formatMessage({ id: "all" }),
          checked: sub || main ? false : true,
        });
        setFilterValues((prev) => ({
          ...prev,
          regions: regions,
        }));
        const regionData = regions?.filter((region) => region.checked);
        const subRegionsArray = regionData.flatMap(
          (region) => region?.sub_regions
        );
        const subRegionData = subRegionsArray.map((subregion) => ({
          value: subregion.id,
          label: subregion.name,
          checked: Number(sub) === subregion.id,
        }));

        setFilterValues((prevFilters) => ({
          ...prevFilters,
          subRegions: [...subRegionData],
        }));
      });
    }
  }, [intl, searchParams]);

  // Effect for filters change
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    const abortController = new AbortController();
    const signal = abortController.signal;
    setData("");
    getUnits(filters, signal).then((response) => {
      setData(response?.data);
      setMeta(response?.meta);
    });
    return () => abortController.abort();
  }, [filters, lang, intl]);

  //  Effect for regions
  useEffect(() => {
    const modifiedSelectedRegions = filterValues.regions
      .filter((region) => region.checked)
      .map((selectedRegion) => {
        return selectedRegion.value;
      });
    const selectedSubRegions = filterValues.subRegions
      .filter((subRegion) => subRegion.checked)
      .map((checkedSubRegion) => checkedSubRegion.value);
    if (modifiedSelectedRegions[0] === "all") {
      const allRegions = filterValues.regions.map((selectedRegion) => {
        return selectedRegion.value;
      });
      getAllSubRegions(allRegions).then((res) => {
        const subRegionsData = res.data?.map((region) => {
          return {
            value: region.id,
            label: region.name,
            checked: false,
          };
        });
        setFilterValues((prev) => {
          return {
            ...prev,
            subRegions: subRegionsData,
          };
        });
      });
    } else {
      getAllSubRegions(modifiedSelectedRegions).then((res) => {
        const subRegionsData = res.data?.map((region, i) => {
          if (!selectedSubRegions.includes(region.id)) {
            return {
              value: region.id,
              label: region.name,
              checked: false,
            };
          } else {
            return {
              value: region.id,
              label: region.name,
              checked: true,
            };
          }
        });

        setFilterValues((prev) => {
          return {
            ...prev,
            subRegions: [...subRegionsData],
          };
        });
      });
    }
  }, [filterValues.regions]);

  // Effect for subRegion
  // useEffect(() => {

  // },[filters.regions])

  const handleUpdateFavList = () => {
    getFavouriteList().then((res) => setFav(res?.data));
  };

  // useEffect(() => {
  //   setData("");
  //   let order_by = "";
  //   let order_type = "";
  //   if (sortFilters) {
  //     const checkedOption = getCheckedOption(sortFilters);
  //     switch (checkedOption) {
  //       case "Option 2":
  //         order_by = "default_price";
  //         order_type = "asc";
  //         break;
  //       case "Option 3":
  //         order_by = "default_price";
  //         order_type = "desc";
  //         break;
  //       case "Option 1":
  //         order_by = "created_at";
  //         order_type = "desc";
  //         break;
  //     }
  //   }
  //   if (filterValues?.regions?.length > 0) {
  //     getAllSubRegions(filterValues?.regions).then((res) => {
  //       let results = [];
  //       res?.data?.map((subRegion) => {
  //         results.push({ value: subRegion.id, label: subRegion.name });
  //       });
  //       setSubRegions(results);
  //     });
  //   } else {
  //     setSubRegions([]);
  //   }
  //   const clonedFilterValues = { ...filterValues };
  //   getAllUnits({ ...clonedFilterValues, order_type, order_by }, page).then(
  //     (res) => {
  //       setData(res.data);
  //       setMeta(res.meta);
  //     }
  //   );
  // }, [filterValues, sortFilters, lang, page]);

  const onSearch = (values) => {};

  const onSubRegionSearch = (values) => {
    values = values.map((region, i) => region.value);
    const updatedSubRegions = [...filterValues.subRegions]?.map((region) => {
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

    setFilterValues((prevFilters) => ({
      ...prevFilters,
      subRegions: updatedSubRegions,
    }));
    const newRegions = updatedSubRegions
      .filter((sub) => sub.checked)
      .map((subregion) => {
        return ["regions[]", subregion.value];
      });

    setFilters((prev) => {
      return {
        ...prev,
        regions: newRegions,
      };
    });
  };

  const handleSortChange = (index) => {
    const updatedSortingFilters = [...sortFilters]; // Create a copy of the current filters array
    // Update the selected radio button's status
    updatedSortingFilters[index].checked = true;
    // Reset the status of the other radio buttons
    for (let i = 0; i < updatedSortingFilters.length; i++) {
      if (i !== index) {
        updatedSortingFilters[i].checked = false;
      }
    }
    const checkedOption = updatedSortingFilters[index];
    switch (checkedOption.value) {
      case "price_low_high":
        setFilters((prev) => ({
          ...prev,
          sortFilters: [
            ["order_by", "default_price"],
            ["order_type", "asc"],
          ],
        }));

        break;
      case "price_high_low":
        setFilters((prev) => ({
          ...prev,
          sortFilters: [
            ["order_by", "default_price"],
            ["order_type", "desc"],
          ],
        }));

        break;
      case "latest":
        setFilters((prev) => ({
          ...prev,
          sortFilters: [
            ["order_by", "created_at"],
            ["order_type", "desc"],
          ],
        }));

        break;
    }
    setSortFilters(updatedSortingFilters); // Update the state with the new filters
  };

  const handlePriceAfterChange = (newPriceRange) => {
    // setPriceRange(newPriceRange);
    // setFilterValues((prevFilters) => ({
    //   ...prevFilters,
    //   ["minPrice"]: newPriceRange[0],
    //   ["maxPrice"]: newPriceRange[1],
    // }));
  };

  const handlePriceChange = (newPriceRange) => {
    // setPriceRange(newPriceRange);
  };

  const handleResetFilters = () => {};

  const handleCheckboxChange = (index, filterKey) => {
    let updatedOptionsFilters = [...filterValues[filterKey]];
    const selectedCheckBox = updatedOptionsFilters[index];
    selectedCheckBox.checked = !selectedCheckBox.checked;

    let selectedOptions = updatedOptionsFilters
      .filter((option, index) => option.checked && index !== 0)
      .map((option, index) => [`${filterKey}[${index}]`, option.value]);

    if (index !== 0) {
      updatedOptionsFilters[0].checked = false;
    } else {
      updatedOptionsFilters[0].checked = true;
      selectedOptions = [];
      const allDisabledOptions = updatedOptionsFilters.map((option, index) => {
        if (index !== 0) {
          return { ...option, checked: false };
        } else {
          return option;
        }
      });
      setFilterValues((prev) => {
        return {
          ...prev,
          [filterKey]: [...allDisabledOptions],
        };
      });
      setFilters((prev) => {
        return {
          ...prev,
          [filterKey]: selectedOptions,
        };
      });
    }
    if (index !== 0) {
      setFilters((prev) => {
        return {
          ...prev,
          [filterKey]: selectedOptions,
        };
      });
    }

    // if (index === 0 && selectedCheckBox.value === "all") {
    //   const allRegions = filterValues.regions.map((selectedRegion) => {
    //     return selectedRegion.value;
    //   });
    //   getAllSubRegions(allRegions).then((res) => {
    //     const subRegionsData = res.data?.map((region) => {
    //       return {
    //         value: region.id,
    //         label: region.name,
    //         checked: false,
    //       };
    //     });
    //     setFilterValues((prev) => {
    //       return {
    //         ...prev,
    //         subRegions: subRegionsData,
    //       };
    //     });
    //   });
    // }
    if (filterKey === "regions") {
      const modifiedSelectedRegions = filterValues.regions
        .filter((region) => region.checked)
        .map((selectedRegion) => {
          return selectedRegion.value;
        });
      getAllSubRegions(modifiedSelectedRegions).then((res) => {
        const subRegionsData = res.data?.map((region, i) => {
          return {
            value: region.id,
            label: region.name,
            checked: false,
          };
        });

        setFilterValues((prev) => {
          return {
            ...prev,
            subRegions: [...subRegionsData],
          };
        });
      });

      const disabledSubRegion = filterValues.subRegions.map((subRegion) => {
        return {
          ...subRegion,
          checked: false,
        };
      });
      setFilterValues((prev) => {
        return {
          ...prev,
          subRegions: [...disabledSubRegion],
        };
      });
    }
  };

  const handleFilterChange = (filterKey, checkbox) => {
    // const values = filterValues[filterKey]; // Get the current filter values
    // const updatedValues =
    //   checkbox.value === "all" &&
    //   (filterKey === "rooms" || filterKey === "beds")
    //     ? checkbox.checked
    //       ? []
    //       : [...values]
    //     : checkbox.checked
    //     ? [...values, checkbox.value] // Add the checkbox value
    //     : values.filter((value) => value !== checkbox.value); // Remove the checkbox value
    // setFilterValues((prevFilters) => ({
    //   ...prevFilters,
    //   [filterKey]: updatedValues,
    // }));
  };

  const getSubRegionsValues = () => {
    const results = [...filterValues.subRegions]?.filter((region) => {
      if (region?.checked) {
        return region;
      }
    });
    return results;
  };

  const getRegionsValues = () => {
    // const results = [...filters.subRegions, ...filters?.regions]?.filter(
    //   (region) => {
    //     if (region?.checked) {
    //       return region;
    //     }
    //   }
    // );
    // return results;
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`d-flex discover_wrapper`}
    >
      <Head>
        <title>Discover | SpotX</title>
        <meta
          name="description"
          content={"Discover units and properties for reservations"}
        />
      </Head>
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
                handleChange={() => handleSortChange(index)}
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
            {filterValues.regions?.map((item, index) => {
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
                  options={filterValues?.subRegions}
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
              {filterValues.rooms?.map((item, index) => {
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
              {filterValues.beds?.map((item, index) => {
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
                    key={unit.id}
                    id={unit.id}
                    title={unit.title}
                    image={unit.images[0]?.url}
                    default_price={unit.current_price}
                    bathrooms={unit.bathrooms}
                    beds={unit.beds}
                    type={unit.type}
                    is_favourite={unit.is_favourite}
                    active_ranges={unit.active_ranges}
                    nearest_active_ranges={unit.nearest_active_ranges}
                    updateFavList={handleUpdateFavList}
                    favouritesList={favourites}
                    total_price={unit.total_price}
                    current_price={unit.current_price}
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
