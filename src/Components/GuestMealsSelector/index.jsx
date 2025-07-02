"use client";
import { useEffect, useState } from "react";

const GuestMealsSelector = ({
  mealsOptions,
  ageRanges,
  adultsNumber,
  maxAdultsNumber,
  maxChildrenNumber,
  freeChildrenNumber,
  onSelectGuestMeals,
  onGuestMealsChange,
  buttonText = "Check Availability",
}) => {
  const [selectedMeal, setSelectedMeal] = useState(mealsOptions[0].id);
  const [adults, setAdults] = useState(adultsNumber);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [freeChildrenSelectedRanges, setFreeChildrenSelectedRanges] =
    useState(0);

  useEffect(() => {
    if (children > childrenAges.length) {
      const newAges = [...childrenAges];
      for (let i = childrenAges.length; i < children; i++) {
        newAges.push(ageRanges[0]?.id || null);
      }
      setChildrenAges(newAges);
    } else if (children < childrenAges.length) {
      setChildrenAges(childrenAges.slice(0, children));
    }
  }, [children, childrenAges.length, ageRanges, childrenAges]);

  useEffect(() => {
    const freeChildren = childrenAges.filter((age) => {
      const ageRange = ageRanges.find((r) => r.id == age);
      return ageRange.is_free;
    });
    setFreeChildrenSelectedRanges(freeChildren.length);
  }, [childrenAges, ageRanges]);

  useEffect(() => {
    onGuestMealsChange();
  }, [selectedMeal, adults, children, onGuestMealsChange]);

  const handleIncrement = (type) => {
    if (type === "adults") {
      setAdults((prev) => Math.min(prev + 1, maxAdultsNumber));
    } else {
      setChildren((prev) => Math.min(prev + 1, maxChildrenNumber));
    }
  };

  const handleDecrement = (type) => {
    if (type === "adults") {
      setAdults((prev) => Math.max(prev - 1, 1));
    } else {
      setChildren((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleChildAgeChange = (index, ageRangeId) => {
    const newChildrenAges = [...childrenAges];
    newChildrenAges[index] = ageRangeId;
    setChildrenAges(newChildrenAges);
  };

  const getAgeRangeLabel = (ageRange, childIndex) => {
    if (ageRange.is_free) {
      const freeChildrenBeforeThis = childrenAges
        .slice(0, childIndex)
        .filter((ageId) => {
          const range = ageRanges.find((r) => r.id == ageId);
          return range && range.is_free;
        }).length;

      if (freeChildrenBeforeThis < freeChildrenNumber) {
        return `${ageRange.age_from}-${ageRange.age_to} years (Free)`;
      }
    }
    return `${ageRange.age_from}-${ageRange.age_to} years`;
  };

  const isChildFree = (childIndex) => {
    const ageId = childrenAges[childIndex];
    if (!ageId) return false;

    const ageRange = ageRanges.find((r) => r.id == ageId);
    if (!ageRange || !ageRange.is_free) return false;

    const freeChildrenBeforeThis = childrenAges
      .slice(0, childIndex)
      .filter((ageId) => {
        const range = ageRanges.find((r) => r.id == ageId);
        return range && range.is_free;
      }).length;

    return freeChildrenBeforeThis < freeChildrenNumber;
  };

  return (
    <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-border-gray-200 tw-p-3 sm:tw-p-6 tw-max-w-3xl tw-mx-auto">
      <div className="tw-mb-6">
        <h2 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-2">
          Select Guests and Meals
        </h2>
        <p className="tw-text-sm sm:tw-text-base tw-text-[#0C0C0CB2] tw-leading-relaxed">
          Specify the number of guests and meal preferences to view available
          dates and get accurate pricing.
        </p>
      </div>

      <div className="tw-mb-8">
        <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-4">
          Available Meals
        </h3>
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-3 sm:tw-gap-4">
          {mealsOptions.map((option) => (
            <label
              key={option.id}
              className="tw-flex tw-items-center tw-p-3 tw-border tw-border-gray-200 tw-rounded-lg tw-cursor-pointer tw-transition-all tw-duration-200 hover:tw-border-[#44bcb7] hover:tw-bg-[#d3f4f2]"
            >
              <input
                type="radio"
                name="meal"
                value={option.id}
                checked={selectedMeal == option.id}
                onChange={(e) => setSelectedMeal(e.target.value)}
                className="tw-sr-only"
              />
              <div className="tw-relative">
                <div
                  className={`tw-w-5 tw-h-5 tw-rounded-full tw-border-2 tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-200 ${
                    selectedMeal == option.id
                      ? "tw-border-[#44bcb7] tw-bg-[#44bcb7]"
                      : "tw-border-gray-300"
                  }`}
                >
                  {selectedMeal == option.id && (
                    <div className="tw-w-2 tw-h-2 tw-bg-white tw-rounded-full"></div>
                  )}
                </div>
              </div>
              <span className="tw-ml-3 tw-text-sm sm:tw-text-base tw-font-medium tw-text-gray-700">
                {option.description}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="tw-mb-8">
        <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-4">
          Guests Info
        </h3>
        <div className="tw-space-y-4 sm:tw-space-y-0 sm:tw-grid sm:tw-grid-cols-2 sm:tw-gap-6">
          <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <span className="tw-text-sm sm:tw-text-base tw-font-medium tw-text-gray-700">
                Adults Number
              </span>
              <div className="tw-flex tw-items-center tw-space-x-3">
                <button
                  onClick={() => handleDecrement("adults")}
                  disabled={adults <= 1}
                  className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-[#44bcb7] tw-text-white tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-200 hover:tw-bg-[#37a7a1] disabled:tw-bg-gray-300 disabled:tw-cursor-not-allowed tw-text-lg tw-font-bold"
                >
                  −
                </button>
                <span className="tw-text-lg sm:tw-text-xl tw-font-bold tw-text-[#EB8D0A] tw-min-w-[2rem] tw-text-center">
                  {adults}
                </span>
                <button
                  onClick={() => handleIncrement("adults")}
                  disabled={adults >= maxAdultsNumber}
                  className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-[#44bcb7] tw-text-white tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-200 hover:tw-bg-[#37a7a1] disabled:tw-bg-gray-300 disabled:tw-cursor-not-allowed tw-text-lg tw-font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <span className="tw-text-sm sm:tw-text-base tw-font-medium tw-text-gray-700">
                Childs Number
              </span>
              <div className="tw-flex tw-items-center tw-space-x-3">
                <button
                  onClick={() => handleDecrement("children")}
                  disabled={children <= 0}
                  className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-[#44bcb7] tw-text-white tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-200 hover:tw-bg-[#37a7a1] disabled:tw-bg-gray-300 disabled:tw-cursor-not-allowed tw-text-lg tw-font-bold"
                >
                  −
                </button>
                <span className="tw-text-lg sm:tw-text-xl tw-font-bold tw-text-[#EB8D0A] tw-min-w-[2rem] tw-text-center">
                  {children}
                </span>
                <button
                  onClick={() => handleIncrement("children")}
                  disabled={children >= maxChildrenNumber}
                  className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-[#44bcb7] tw-text-white tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-200 hover:tw-bg-[#37a7a1] disabled:tw-bg-gray-300 disabled:tw-cursor-not-allowed tw-text-lg tw-font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {children > 0 && (
        <div className="tw-mb-8">
          <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-4">
            Children Age Ranges
          </h3>
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-2 tw-gap-4">
            {Array.from({ length: children }, (_, index) => (
              <div
                key={index}
                className="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-border tw-border-gray-200"
              >
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-3">
                  Child {index + 1} Age Range
                </label>
                <div className="tw-relative">
                  <select
                    value={childrenAges[index] || ""}
                    onChange={(e) =>
                      handleChildAgeChange(index, +e.target.value)
                    }
                    className="tw-w-full tw-p-3 tw-pr-10 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white tw-text-gray-900 tw-text-sm sm:tw-text-base tw-font-medium tw-appearance-none tw-cursor-pointer tw-transition-all tw-duration-200 hover:tw-border-[#44bcb7] focus:tw-border-[#44bcb7] focus:tw-ring-2 focus:tw-ring-[#44bcb7]/20 focus:tw-outline-none"
                  >
                    <option value="" disabled>
                      Select age range
                    </option>
                    {ageRanges.map((ageRange) => (
                      <option key={ageRange.id} value={ageRange.id}>
                        {getAgeRangeLabel(ageRange, index)}
                      </option>
                    ))}
                  </select>
                  <div className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-3 tw-pointer-events-none">
                    <svg
                      className="tw-w-5 tw-h-5 tw-text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                {childrenAges[index] && isChildFree(index) ? (
                  ageRanges.find((range) => range.id == childrenAges[index])
                    ?.is_free ? (
                    <div className="tw-mt-2 tw-inline-flex tw-items-center tw-px-2 tw-py-1 tw-rounded-full tw-bg-green-100 tw-text-green-800 tw-text-xs tw-font-medium">
                      <svg
                        className="tw-w-3 tw-h-3 tw-mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Free
                    </div>
                  ) : null
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        className="tw-w-full tw-bg-[linear-gradient(180deg,_#44BCB7_-16.5%,_#2396CC_54.7%)] tw-text-white tw-font-semibold tw-py-3 sm:tw-py-4 tw-px-6 tw-rounded-lg tw-transition-all tw-duration-300 hover:tw-shadow-lg tw-text-base sm:tw-text-lg"
        onClick={() => {
          const queryString = childrenAges.reduce((acc, age, index) => {
            return acc + (index === 0 ? "" : "&") + `children[]=${age}`;
          }, "");
          const mealString = `&meal_id=${selectedMeal}&`;
          const adultsString = `adults=${adults}`;

          const urlParams = adultsString + mealString + queryString;
          const rangesCount = {};

          childrenAges.map((range) => {
            return (rangesCount[range] = (rangesCount[range] || 0) + 1);
          });
          const modifiedRangesCount = {};

          ageRanges.forEach((range) => {
            if (rangesCount[range.id]) {
              modifiedRangesCount[`${range.age_from}-${range.age_to}`] =
                rangesCount[range.id];
            }
          });
          const modifiedSelectedMeal = mealsOptions.find(
            (meal) => meal.id == selectedMeal
          );

          onSelectGuestMeals(urlParams, {
            modifiedRangesCount,
            modifiedSelectedMeal,
            adults,
            childrenFormRanges: [...childrenAges],
          });
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default GuestMealsSelector;
