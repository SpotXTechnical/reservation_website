import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { useRouter } from "next/router";
import { getSummary } from "../../app/Apis/PropertyApis";

const DateRangeCalendarPicker = ({
  activeRanges,
  handleShowReservationModal,
  defaultPrice,
  extractedDates,
  modifiedReservedDays,
  unitType,
  setModalLoadingState,
  showModal,
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const router = useRouter();
  const { id } = router.query;
  const [dateError, setDateError] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);

  const [startDates, setStartDates] = useState([]);
  const [endDates, setEndDates] = useState([]);
  const [overlapDates, setOverlapDates] = useState([]);

  // Process reservation dates to identify starts, ends, and overlaps
  useEffect(() => {
    if (modifiedReservedDays && modifiedReservedDays.length > 0) {
      const starts = new Set();
      const ends = new Set();
      const overlaps = new Set();

      // First collect all start and end dates
      modifiedReservedDays.forEach((reservation) => {
        const startFormatted = moment(reservation.from).format("YYYY-MM-DD");
        const endFormatted = moment(reservation.to).format("YYYY-MM-DD");
        starts.add(startFormatted);
        ends.add(endFormatted);
      });

      // Find overlaps (dates that are both start and end)
      starts.forEach((date) => {
        if (ends.has(date)) {
          overlaps.add(date);
          starts.delete(date);
          ends.delete(date);
        }
      });

      setStartDates(Array.from(starts).map((date) => new Date(date)));
      setEndDates(Array.from(ends).map((date) => new Date(date)));
      setOverlapDates(Array.from(overlaps).map((date) => new Date(date)));
    }
  }, [modifiedReservedDays]);

  const modifiedExtractedDates = () => {
    const modified = extractedDates.map((date) => {
      return moment(date).format("DD-MM-YYYY");
    });
    return modified;
  };

  const getAllDays = (activeReservations) => {
    const allDays = [];
    const formattedEndDates = new Set(
      endDates.map((date) => moment(date).format("DD-MM-YYYY"))
    );
    const formattedStartDates = new Set(
      startDates.map((date) => moment(date).format("DD-MM-YYYY"))
    );
    const formattedOverlapDates = new Set(
      overlapDates.map((date) => moment(date).format("DD-MM-YYYY"))
    );
    const formattedExtractedDates = modifiedExtractedDates();

    activeReservations.forEach((range) => {
      const startDate = new Date(range.from);
      const endDate = new Date(range.to);

      // Subtract 1 day from end date to get the last day of stay
      const lastDayOfStay = new Date(endDate);
      lastDayOfStay.setDate(lastDayOfStay.getDate() - 1);

      const currentDate = new Date(startDate);

      // Iterate through all days in the reservation range
      while (currentDate <= lastDayOfStay) {
        const currentFormatted = moment(currentDate).format("DD-MM-YYYY");

        // Skip extracted dates that aren't end dates (these will have special rendering)
        if (
          formattedExtractedDates.includes(currentFormatted) &&
          !formattedEndDates.has(currentFormatted) &&
          !formattedOverlapDates.has(currentFormatted)
        ) {
          currentDate.setDate(currentDate.getDate() + 1);
          continue;
        }

        // Add regular disabled days
        allDays.push(new Date(currentDate.toISOString().split("T")[0]));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    // Add overlap dates (dates that are both start and end) to disabled days
    overlapDates.forEach((date) => {
      allDays.push(new Date(date));
    });

    return allDays;
  };

  const getPastDays = () => {
    const pastDays = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1); // Go back one year

    const currentDate = new Date(startDate);
    while (currentDate < today) {
      pastDays.push(new Date(currentDate.toISOString().split("T")[0])); // Make sure we have clean date objects
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return pastDays;
  };

  const allDaysArray = [...getAllDays(modifiedReservedDays), ...getPastDays()];

  const handleSelect = (ranges) => {
    setSelectedDateRange(ranges.selection);
    setDateChanged(true);
    setDateError(false);
  };

  const handleReserve = () => {
    const startDate = moment(selectedDateRange.startDate).format("DD-MM-YYYY");
    const endDate = moment(selectedDateRange.endDate).format("DD-MM-YYYY");
    if (startDate !== endDate && dateChanged) {
      const summaryData = new FormData();
      summaryData.append(
        "from",
        moment(selectedDateRange.startDate).format("YYYY-MM-DD")
      );
      summaryData.append(
        "to",
        moment(selectedDateRange.endDate).format("YYYY-MM-DD")
      );
      summaryData.append("unit_id", id);
      summaryData.append("unit_type", unitType);
      showModal(true);
      setModalLoadingState((prev) => !prev);
      getSummary(summaryData)
        .then((res) => {
          setModalLoadingState((prev) => !prev);
          handleShowReservationModal(res?.data);
        })
        .catch((error) => {});
    } else {
      setDateError(true);
    }
  };

  function calculatePrice(date, activeRanges, defaultPrice) {
    for (const range of activeRanges) {
      const fromDate = new Date(range.from);
      const toDate = new Date(range.to);
      if (
        resetTime(date).getTime() >= resetTime(fromDate).getTime() &&
        resetTime(date).getTime() <= resetTime(toDate).getTime()
      ) {
        return range.price;
      }
    }

    return defaultPrice;
  }

  function resetTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  const isDateInArray = (date, dateArray) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return dateArray.some(
      (item) => moment(item).format("YYYY-MM-DD") === formattedDate
    );
  };

  return (
    <div className="tw-flex tw-flex-col tw-w-full">
      {/* Calendar Container */}
      <div className="tw-w-full tw-rounded-lg tw-shadow-sm tw-overflow-hidden">
        <DateRangePicker
          ranges={[selectedDateRange]}
          onChange={handleSelect}
          direction="horizontal"
          disabledDates={allDaysArray}
          showMonthAndYearPickers={false}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          showPreview={true}
          minDate={new Date()}
          className="tw-w-full"
          dayContentRenderer={(day) => {
            const price = calculatePrice(day, activeRanges, defaultPrice);
            const date = new Date(day);
            const dayOfMonth = date.getDate();

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const isPastDate = date < today;

            const isStartDate = !isPastDate && isDateInArray(date, startDates);
            const isEndDate = !isPastDate && isDateInArray(date, endDates);

            return (
              <div
                className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full
                  ${
                    isStartDate
                      ? "tw-relative before:tw-absolute before:tw-content-[''] before:tw-inset-0 before:tw-bg-[linear-gradient(to_bottom_right,transparent_49%,#e3e3e399_50%)] tw-z-0"
                      : ""
                  }
                  ${
                    isEndDate
                      ? "tw-relative before:tw-absolute before:tw-content-[''] before:tw-inset-0 before:tw-bg-[linear-gradient(to_bottom_right,#e3e3e399_49%,transparent_50%)] tw-z-0"
                      : ""
                  }
                `}
              >
                <span className="tw-text-sm tw-font-medium">{dayOfMonth}</span>
                <span className="tw-text-xs tw-text-blue-500">{price}</span>
              </div>
            );
          }}
        />
      </div>

      {dateError && (
        <div className="tw-text-red-500 tw-mt-2 tw-text-sm tw-font-medium">
          <FormattedMessage id="you_must_select_a_range" />
        </div>
      )}

      <div className="tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-mt-4 tw-p-3 tw-bg-gray-50 tw-rounded-lg">
        <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2 sm:tw-mb-0">
          <div className="tw-w-4 tw-h-4 tw-bg-[#fcd95c] tw-rounded-sm"></div>
          <span className="tw-text-xs tw-text-gray-600">
            <FormattedMessage id="Selected" />
          </span>
        </div>

        <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2 sm:tw-mb-0">
          <div className="tw-w-4 tw-h-4 tw-bg-white tw-border tw-border-gray-300 tw-rounded-sm"></div>
          <span className="tw-text-xs tw-text-gray-600">
            <FormattedMessage id="Avaliable" />
          </span>
        </div>

        <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2 sm:tw-mb-0">
          <div className="tw-w-4 tw-h-4 tw-bg-[#e3e3e399] tw-rounded-sm"></div>
          <span className="tw-text-xs tw-text-gray-600">
            <FormattedMessage id="Not_Avaliable" />
          </span>
        </div>

        <div className="tw-flex tw-items-center tw-gap-2">
          <div className="tw-w-4 tw-h-4 tw-bg-[linear-gradient(to_bottom_right,transparent_49%,#e3e3e399_50%)] tw-border tw-border-gray-300  tw-rounded-sm"></div>
          <span className="tw-text-xs tw-text-gray-600">
            <FormattedMessage id="Checkout" />
          </span>
        </div>
      </div>

      <button
        className="tw-w-full tw-mt-4 tw-bg-[#44bcb7] hover:tw-bg-[#44bcd7] tw-text-white tw-font-bold tw-py-3 tw-px-6 tw-rounded-lg tw-transition-colors tw-duration-200"
        onClick={() => {
          handleReserve();
        }}
      >
        <FormattedMessage id="Summary" />
      </button>
    </div>
  );
};

export default DateRangeCalendarPicker;
