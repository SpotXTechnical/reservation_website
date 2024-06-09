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
import { useDispatch, useSelector } from "react-redux";
import store, { langAction } from "../../store";
import Head from "next/head";
import { useRouter } from "next/router";
import { getFeatures, getUnits } from "../../app/Apis/Discover";
import { useSearchParams } from "next/navigation";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  setFilterValues,
  setFilterFields,
  updateSortFilter,
  setPrices,
  setPriceRange,
  setDateRange,
  setPage,
  setHasOffer,
  setNumberOfGuests,
} from "../../store/DiscoverFilters/discoverFilters";

const Reservations = () => {
  const searchParams = useSearchParams();
  const main = searchParams.get("main");
  const sub = searchParams.get("sub");
  const discoverFilters = useSelector((state) => state.discoverFilters);
  const dispatch = useDispatch();
  const intl = useIntl();
  const WITH_SUB_REGION = 1;
  const [data, setData] = useState("");
  const [meta, setMeta] = useState("");

  const [favourites, setFav] = useState([]);
  const [startDate, endDate] = discoverFilters.dateRange;
  const [rangeError, setRangeError] = useState(null);

  let { lang } = useSelector((state) => state.language);

  const handlePagination = (page) => {
    const PAGE = page.selected + 1;
    dispatch(setPage(PAGE));
    dispatch(
      setFilterValues({
        key: "page",
        value: [["page", PAGE]],
      })
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      const language = storedLanguage ? storedLanguage : "en";
      store.dispatch(
        language === "ar" ? langAction.langAr() : langAction.langEn()
      );
    }
  }, []);

  useEffect(() => {
    getFavouriteList().then((res) => setFav(res?.data));
  }, []);

  // Effect for beds and rooms
  useEffect(() => {
    getFilterConfig().then((res) => {
      let { types, max_rooms, max_beds, min_price, max_price } = res.data;
      if (!discoverFilters.minPrice && !discoverFilters.maxPrice) {
        dispatch(
          setPrices({
            minPrice: min_price,
            maxPrice: max_price,
          })
        );
        dispatch(
          setFilterValues({
            key: "prices",
            value: [
              ["price[from]", min_price],
              ["price[to]", max_price],
            ],
          })
        );
      }
      if (discoverFilters.priceRange.length === 0) {
        dispatch(setPriceRange([min_price, max_price]));
      }

      if (discoverFilters.filterFields.types.length === 0) {
        types = types?.map((type, i) => ({
          value: type.value,
          label: type.name,
          checked: false,
        }));
        dispatch(setFilterFields({ types }));
      }
      console.log(types);
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

      if (
        discoverFilters.filterFields.beds.length === 0 ||
        discoverFilters.filterFields.rooms.length === 0
      ) {
        dispatch(
          setFilterFields({
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
          })
        );
      }
    });
    if (discoverFilters.filterFields.features.length === 0) {
      getFeatures().then((response) => {
        const features = response?.data?.map((feature) => {
          return {
            value: feature.id,
            label: feature.name,
            checked: false,
          };
        });

        dispatch(
          setFilterFields({
            features: [...features],
          })
        );
      });
    }
  }, [
    discoverFilters.filterFields.beds.length,
    discoverFilters.filterFields.features.length,
    discoverFilters.filterFields.rooms.length,
    discoverFilters.filterFields.types.length,
    discoverFilters.maxPrice,
    discoverFilters.minPrice,
    discoverFilters.priceRange.length,
    dispatch,
    intl,
  ]);

  // Effect for query params which is based from home page
  useEffect(() => {
    if (discoverFilters.filterFields.regions.length === 0) {
      if (main || sub) {
        const newRegions = sub ? [["regions[]", sub]] : [["regions[]", main]];
        dispatch(
          setFilterValues({
            key: "regions",
            value: [...newRegions],
          })
        );
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

          dispatch(
            setFilterFields({
              regions: regions,
            })
          );
          const regionData = regions?.filter((region) => region.checked);
          const subRegionsArray = regionData.flatMap(
            (region) => region?.sub_regions
          );
          const subRegionData = subRegionsArray.map((subregion) => ({
            value: subregion.id,
            label: subregion.name,
            checked: Number(sub) === subregion.id,
          }));

          dispatch(
            setFilterFields({
              subRegions: [...subRegionData],
            })
          );
        });
      }
    }
  }, [dispatch, intl, main, sub]);

  // Effect for filters change
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    const abortController = new AbortController();
    const signal = abortController.signal;
    setData("");
    getUnits(discoverFilters.filtersValues, signal).then((response) => {
      setData(response?.data);
      setMeta(response?.meta);
    });
    return () => abortController.abort();
  }, [discoverFilters.filtersValues, lang]);

  //  Effect for regions
  useEffect(() => {
    const modifiedSelectedRegions = discoverFilters?.filterFields?.regions
      .filter((region) => region?.checked)
      .map((selectedRegion) => {
        return selectedRegion.value;
      });
    const selectedSubRegions = discoverFilters.filterFields.subRegions
      .filter((subRegion) => subRegion.checked)
      .map((checkedSubRegion) => checkedSubRegion.value);

    console.log({ selectedSubRegions });
    if (modifiedSelectedRegions[0] === "all") {
      const allRegions = discoverFilters.filterFields.regions.map(
        (selectedRegion) => {
          return selectedRegion.value;
        }
      );
      getAllSubRegions(allRegions).then((res) => {
        const subRegionsData = res.data?.map((region) => {
          return {
            value: region.id,
            label: region.name,
            checked: selectedSubRegions.includes(region.id) ? true : false,
          };
        });

        dispatch(
          setFilterFields({
            subRegions: subRegionsData,
          })
        );
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

        dispatch(
          setFilterFields({
            subRegions: [...subRegionsData],
          })
        );
      });
    }
  }, [discoverFilters.filterFields.regions, dispatch]);

  // Effect for subRegion
  useEffect(() => {
    if (discoverFilters.filtersValues.regions.length === 0) {
      const selectedRegion = discoverFilters.filterFields.regions
        .filter((region) => region.checked)
        .map((option) => {
          if (option.value !== "all") {
            return ["regions[]", option.value];
          } else {
            return "all";
          }
        });
      if (selectedRegion[0] === "all") {
        dispatch(
          setFilterValues({
            key: "regions",
            value: [],
          })
        );
      } else if (selectedRegion[0] !== "all" && selectedRegion.length > 0) {
        dispatch(
          setFilterValues({
            key: "regions",
            value: selectedRegion,
          })
        );
      } else if (selectedRegion.length === 0) {
        const modifiedRegions = discoverFilters.filterFields.regions.map(
          (option) => {
            if (option.value === "all") {
              return {
                ...option,
                checked: true,
              };
            } else {
              return option;
            }
          }
        );
        dispatch(
          setFilterFields({
            regions: modifiedRegions,
          })
        );
      }
    }
  }, [discoverFilters.filtersValues.regions.length, dispatch]);

  const handleUpdateFavList = () => {
    getFavouriteList().then((res) => setFav(res?.data));
  };

  const handleSearch = (event) => {
    dispatch(
      setFilterValues({
        key: "keyWord",
        value: [["keyword", event.target.value]],
      })
    );
  };

  const onSubRegionSearch = (values) => {
    values = values.map((region, i) => region.value);
    const updatedSubRegions = [...discoverFilters.filterFields.subRegions]?.map(
      (region) => {
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
      }
    );

    dispatch(
      setFilterFields({
        subRegions: updatedSubRegions,
      })
    );

    const newRegions = updatedSubRegions
      .filter((sub) => sub.checked)
      .map((subregion) => {
        return ["regions[]", subregion.value];
      });

    dispatch(
      setFilterValues({
        key: "regions",
        value: newRegions,
      })
    );
  };

  const handleSortChange = (index) => {
    const updatedSortingFilters = discoverFilters.sortFilters.map((option) => ({
      ...option,
    }));
    // Update the selected radio button's status
    updatedSortingFilters[index].checked = true;
    // Reset the status of the other radio buttons
    for (let i = 0; i < updatedSortingFilters.length; i++) {
      if (i !== index) {
        updatedSortingFilters[i].checked = false;
      }
    }

    dispatch(updateSortFilter(updatedSortingFilters));
    const checkedOption = updatedSortingFilters[index];
    switch (checkedOption.value) {
      case "price_low_high":
        dispatch(
          setFilterValues({
            key: "sortFilters",
            value: [
              ["order_by", "default_price"],
              ["order_type", "asc"],
            ],
          })
        );

        break;
      case "price_high_low":
        dispatch(
          setFilterValues({
            key: "sortFilters",
            value: [
              ["order_by", "default_price"],
              ["order_type", "desc"],
            ],
          })
        );

        break;
      case "latest":
        dispatch(
          setFilterValues({
            key: "sortFilters",
            value: [
              ["order_by", "created_at"],
              ["order_type", "desc"],
            ],
          })
        );

        break;
    }
  };

  const handlePriceAfterChange = (newPriceRange) => {
    // dispatch(
    //   setPrices({ maxPrice: newPriceRange[1], minPrice: newPriceRange[0] })
    // );

    dispatch(
      setFilterValues({
        key: "prices",
        value: [
          ["price[from]", newPriceRange[0]],
          ["price[to]", newPriceRange[1]],
        ],
      })
    );
  };

  const handlePriceChange = (newPriceRange) => {
    dispatch(setPriceRange(newPriceRange));
  };

  const handleResetFilters = () => {};

  const handleCheckboxChange = (index, filterKey) => {
    let updatedOptionsFilters = discoverFilters.filterFields[filterKey].map(
      (option) => ({ ...option })
    );
    const selectedCheckBox = updatedOptionsFilters[index];

    let selectedOptions;

    if (index !== 0) {
      selectedCheckBox.checked = !selectedCheckBox.checked;
      updatedOptionsFilters[0].checked = false;
      selectedOptions = updatedOptionsFilters
        .filter((option, index) => option.checked && index !== 0)
        .map((option, index) => [`${filterKey}[${index}]`, option.value]);
      dispatch(
        setFilterFields({
          [filterKey]: updatedOptionsFilters,
        })
      );
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

      dispatch(
        setFilterFields({
          [filterKey]: allDisabledOptions,
        })
      );
      dispatch(
        setFilterValues({
          key: filterKey,
          value: selectedOptions,
        })
      );
    }
    if (index !== 0) {
      dispatch(
        setFilterValues({
          key: filterKey,
          value: selectedOptions,
        })
      );
    }
    if (filterKey === "regions") {
      const modifiedSelectedRegions = discoverFilters.filterFields.regions
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

        dispatch(
          setFilterFields({
            subRegions: [...subRegionsData],
          })
        );
      });

      const disabledSubRegion = discoverFilters.filterFields.subRegions.map(
        (subRegion) => {
          return {
            ...subRegion,
            checked: false,
          };
        }
      );

      dispatch(
        setFilterFields({
          subRegions: [...disabledSubRegion],
        })
      );
    }
  };

  const getSubRegionsValues = () => {
    const results = [...discoverFilters.filterFields.subRegions]?.filter(
      (region) => {
        if (region?.checked) {
          return region;
        }
      }
    );
    return results;
  };

  const getFeaturesValues = () => {
    const results = [...discoverFilters.filterFields.features]?.filter(
      (feature) => {
        if (feature?.checked) {
          return feature;
        }
      }
    );
    return results;
  };

  const handleAvailability = (update) => {
    dispatch(setDateRange(update));
    if (update[0] && update[1]) {
      setRangeError("");
      dispatch(
        setFilterValues({
          key: "availability",
          value: [
            ["available[from]", moment(update[0]).format("DD-MM-YYYY")],
            ["available[to]", moment(update[1]).format("DD-MM-YYYY")],
          ],
        })
      );
    } else if (update[0] && !update[1]) {
      setRangeError("Please Select a valid range");
    } else {
      dispatch(
        setFilterValues({
          key: "availability",
          value: [],
        })
      );
    }
  };

  const handleFeaturesChange = (values) => {
    const valuesIds = values.map((feature) => feature.value);
    console.log(valuesIds);
    const newFeatures = discoverFilters.filterFields.features.map((feature) => {
      if (valuesIds.includes(feature.value)) {
        return { ...feature, checked: true };
      } else {
        return { ...feature, checked: false };
      }
    });

    dispatch(setFilterFields({ features: newFeatures }));
    const featuresFilter = values?.map((feature) => {
      return ["features[]", feature.value];
    });
    dispatch(
      setFilterValues({
        key: "features",
        value: featuresFilter,
      })
    );
  };

  const handleHasOffer = (event) => {
    dispatch(setHasOffer(Number(event.target.checked)));
    dispatch(
      setFilterValues({
        key: "hasOffer",
        value: [["has_offer", Number(event.target.checked)]],
      })
    );
  };

  const handleGuestChange = (event) => {
    dispatch(setNumberOfGuests(event.target.value));
    dispatch(
      setFilterValues({
        key: "guests",
        value: [["guest", event.target.value]],
      })
    );
  };

  const handleTypesChange = (selectedType) => {
    const newTypes = discoverFilters.filterFields.types.map((type) => {
      if (type.value === selectedType.value) {
        return { ...type, checked: true };
      } else {
        return { ...type, checked: false };
      }
    });

    dispatch(setFilterFields({ types: newTypes }));

    dispatch(
      setFilterValues({
        key: "type",
        value: [["type", selectedType.value]],
      })
    );
  };

  const getTypesValues = () => {
    const results = [...discoverFilters.filterFields.types]?.filter((type) => {
      if (type?.checked) {
        return type;
      }
    });
    return results;
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
      <div className={`d-flex flex-column filters sidbar p-2`}>
        <div className={`w-100 mb-5 sort_section`}>
          <h4 className="mb-4 fw-bold">
            <img src="assets/sortIcon.png" alt="sort" className="me-2" />
            <FormattedMessage id="sort" />
          </h4>
          {discoverFilters?.sortFilters.map((item, index) => {
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
            <p className={`mb-2 subtitle fw-bold`}>
              <FormattedMessage id="profile.edit.fields.city.label" />
            </p>
            {discoverFilters.filterFields.regions?.map((item, index) => {
              return (
                <Checkbox
                  key={index}
                  value={item?.value}
                  checked={item?.checked}
                  handleChange={() => handleCheckboxChange(index, "regions")}
                  // className={`${styles.filter_radio}`}
                  label={item?.label}
                />
              );
            })}

            <div className={`mb-3 mt-4 sub_regions`}>
              <p className={`mb-2 subtitle fw-bold`}>
                <FormattedMessage id="Resort / Region" />
              </p>
              <div className={`search_container d-inline-block w-100`}>
                <InputSelect
                  value={getSubRegionsValues()}
                  isMulti={true}
                  options={discoverFilters.filterFields?.subRegions}
                  className="search_input"
                  onChange={onSubRegionSearch}
                  hideIndecators={false}
                  placeholder={
                    <FormattedMessage id="dicover.subRegions.search.placeholder" />
                  }
                />
              </div>
            </div>

            {/* Features */}
            <div className={`mb-3 mt-4 sub_regions`}>
              <p className={`mb-2 subtitle fw-bold`}>
                <FormattedMessage id="Features" />
              </p>
              <div className={`search_container d-inline-block w-100`}>
                <InputSelect
                  value={getFeaturesValues()}
                  isMulti={true}
                  options={discoverFilters.filterFields?.features}
                  className="search_input"
                  onChange={handleFeaturesChange}
                  hideIndecators={false}
                  placeholder={
                    <FormattedMessage id="dicover.subRegions.search.placeholder" />
                  }
                />
              </div>
            </div>
            {/* Types */}
            <div className={`mb-3 mt-4 sub_regions`}>
              <p className={`mb-2 subtitle fw-bold`}>
                <FormattedMessage id="Types" />
              </p>
              <div className={`search_container d-inline-block w-100`}>
                <InputSelect
                  value={getTypesValues()}
                  options={discoverFilters.filterFields?.types}
                  className="search_input"
                  onChange={handleTypesChange}
                  hideIndecators={false}
                  placeholder={
                    <FormattedMessage id="dicover.subRegions.search.placeholder" />
                  }
                />
              </div>
            </div>
          </div>

          <div className={`mb-3 rooms`}>
            <p className={`mb-2 subtitle fw-bold`}>
              <FormattedMessage id="roomsNum" />
            </p>
            <div className={`d-flex flex-wrap`}>
              {discoverFilters.filterFields.rooms?.map((item, index) => {
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
            <p className={`mb-2 subtitle fw-bold`}>
              <FormattedMessage id="bedsNum" />
            </p>
            <div className={`d-flex flex-wrap`}>
              {discoverFilters.filterFields.beds?.map((item, index) => {
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
            <p className={`mb-2 subtitle fw-bold`}>
              <FormattedMessage id="price" />
            </p>
            <div className={`d-flex`}>
              <PriceRangeComponent
                min={discoverFilters.minPrice}
                max={discoverFilters.maxPrice}
                step={1}
                priceRange={discoverFilters.priceRange}
                handlePriceChange={handlePriceChange}
                handlePriceAfterChange={handlePriceAfterChange}
              />
            </div>
          </div>
          <div className={`mb-3 price_range`}>
            <p className={`mb-2 subtitle fw-bold`}>
              <FormattedMessage id="availability" />
            </p>
            <div className={`d-flex flex-column gap-1`}>
              <div>
                <ReactDatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleAvailability}
                  isClearable={true}
                  minDate={new Date()}
                  showIcon
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z"
                        fill="#A2A2A2"
                      />
                      <path
                        d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z"
                        fill="#A2A2A2"
                      />
                      <path
                        d="M20.5 9.83997H3.5C3.09 9.83997 2.75 9.49997 2.75 9.08997C2.75 8.67997 3.09 8.33997 3.5 8.33997H20.5C20.91 8.33997 21.25 8.67997 21.25 9.08997C21.25 9.49997 20.91 9.83997 20.5 9.83997Z"
                        fill="#A2A2A2"
                      />
                      <path
                        d="M16 22.75H8C4.35 22.75 2.25 20.65 2.25 17V8.5C2.25 4.85 4.35 2.75 8 2.75H16C19.65 2.75 21.75 4.85 21.75 8.5V17C21.75 20.65 19.65 22.75 16 22.75ZM8 4.25C5.14 4.25 3.75 5.64 3.75 8.5V17C3.75 19.86 5.14 21.25 8 21.25H16C18.86 21.25 20.25 19.86 20.25 17V8.5C20.25 5.64 18.86 4.25 16 4.25H8Z"
                        fill="#A2A2A2"
                      />
                      <path
                        d="M8.5 14.5C8.37 14.5 8.24 14.47 8.12 14.42C8 14.37 7.89001 14.3 7.79001 14.21C7.70001 14.11 7.62999 14 7.57999 13.88C7.52999 13.76 7.5 13.63 7.5 13.5C7.5 13.24 7.61001 12.98 7.79001 12.79C7.89001 12.7 8 12.63 8.12 12.58C8.3 12.5 8.50001 12.48 8.70001 12.52C8.76001 12.53 8.82 12.55 8.88 12.58C8.94 12.6 9 12.63 9.06 12.67C9.11 12.71 9.15999 12.75 9.20999 12.79C9.24999 12.84 9.29999 12.89 9.32999 12.94C9.36999 13 9.40001 13.06 9.42001 13.12C9.45001 13.18 9.47001 13.24 9.48001 13.3C9.49001 13.37 9.5 13.43 9.5 13.5C9.5 13.76 9.38999 14.02 9.20999 14.21C9.01999 14.39 8.76 14.5 8.5 14.5Z"
                        fill="#A2A2A2"
                      />
                      <path
                        d="M12 14.5C11.74 14.5 11.48 14.39 11.29 14.21C11.25 14.16 11.21 14.11 11.17 14.06C11.13 14 11.1 13.94 11.08 13.88C11.05 13.82 11.03 13.76 11.02 13.7C11.01 13.63 11 13.57 11 13.5C11 13.37 11.03 13.24 11.08 13.12C11.13 13 11.2 12.89 11.29 12.79C11.57 12.51 12.02 12.42 12.38 12.58C12.51 12.63 12.61 12.7 12.71 12.79C12.89 12.98 13 13.24 13 13.5C13 13.57 12.99 13.63 12.98 13.7C12.97 13.76 12.95 13.82 12.92 13.88C12.9 13.94 12.87 14 12.83 14.06C12.79 14.11 12.75 14.16 12.71 14.21C12.61 14.3 12.51 14.37 12.38 14.42C12.26 14.47 12.13 14.5 12 14.5Z"
                        fill="#A2A2A2"
                      />
                      <path
                        d="M8.5 18C8.37 18 8.24 17.97 8.12 17.92C8 17.87 7.89001 17.8 7.79001 17.71C7.70001 17.61 7.62999 17.51 7.57999 17.38C7.52999 17.26 7.5 17.13 7.5 17C7.5 16.74 7.61001 16.48 7.79001 16.29C7.89001 16.2 8 16.13 8.12 16.08C8.49 15.92 8.92999 16.01 9.20999 16.29C9.24999 16.34 9.29999 16.39 9.32999 16.44C9.36999 16.5 9.40001 16.56 9.42001 16.62C9.45001 16.68 9.47001 16.74 9.48001 16.81C9.49001 16.87 9.5 16.94 9.5 17C9.5 17.26 9.38999 17.52 9.20999 17.71C9.01999 17.89 8.76 18 8.5 18Z"
                        fill="#A2A2A2"
                      />
                    </svg>
                  }
                />
              </div>
              {rangeError && (
                <span className="d-block mt-1 text-danger">{rangeError}</span>
              )}
            </div>
          </div>
          <div className={`mb-1 price_range`}>
            <p className={`mb-2 subtitle fw-bold`}>
              <FormattedMessage id="Has offers" />
            </p>
            <div className="form-check form-switch">
              <input
                className="form-check-input cursor-pointer"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                onChange={handleHasOffer}
                checked={Boolean(discoverFilters.hasOffer)}
              />
            </div>
          </div>
          {/* Guests */}
          <div className={`mb-3 mt-3 price_range`}>
            <p className={`mb-2 subtitle fw-bold`}>
              <FormattedMessage id="Guests" />
            </p>
            <div className={`search_container d-inline-block w-100`}>
              <input
                type="number"
                className="form-control"
                id="guests"
                placeholder="Number of guests"
                onChange={handleGuestChange}
                value={discoverFilters.noOfGuests}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="discover_container flex-2">
        <div className="discover">
          <p className={`text-center heading_title`}>
            <FormattedMessage id="discoverAndbook" />
          </p>
          <div className={`search_container d-inline-block w-100`}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control p-3 fs-5"
                placeholder="Search for a unit"
                aria-label="search"
                aria-describedby="search"
                onChange={handleSearch}
              />
            </div>
            {/* <input
              value={""}
              onChange={onSearch}
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
            /> */}
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
                    image={unit?.main_image?.url || unit.images[0]?.url}
                    default_price={unit.current_price}
                    bathrooms={unit.bathrooms}
                    bed_rooms={unit.bed_rooms}
                    klass={unit.klass}
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
