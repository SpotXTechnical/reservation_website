import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "./DateRangePicker.css";

const DateRangeCalendarPicker = ({
  activeRanges,
  activeReservations,
  handleShowReservationModal,
  defaultPrice,
  extractedDates,
  modifiedReservedDays,
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [dateError, setDateError] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);
  const getAllDays = (activeReservations) => {
    const allDays = [];

    activeReservations.forEach((range) => {
      const startDate = new Date(range.from);
      const endDate = new Date(range.to);

      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        allDays.push(new Date(currentDate.toISOString().split("T")[0]));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return allDays;
  };

  // const checkBeforeDay = (days)=> {
  //   let disabledDays = [...days]
  //   extractedDates.map((date)=> {
  //     const currentDate = new Date(date);
  //     if( disabledDays.includes(currentDate.getDate() - 1)){
  //       disabledDays.push(new Date(date))
  //     }
  //   })
  //   return days
  // }

  const checkBeforeDay = (arr1, arr2) => {
    let disabledDays = [...arr1];

    const timestampSet = new Set(arr1.map((date) => date.getTime()));
    for (let i = 0; i < arr2.length; i++) {
      const currentDate = new Date(arr2[i]);
      currentDate.setDate(currentDate.getDate() - 1);

      if (timestampSet.has(currentDate.getTime())) {
        disabledDays.push(new Date(arr2[i]));
      }
    }
    return disabledDays;
  };
  const allDaysArray = checkBeforeDay(
    getAllDays(modifiedReservedDays),
    extractedDates
  );

  const handleSelect = (ranges) => {
    setSelectedDateRange(ranges.selection);
    setDateChanged(true);
    setDateError(false);
  };

  const handleReserve = () => {
    if (
      selectedDateRange.startDate !== selectedDateRange.endDate &&
      dateChanged
    ) {
      handleShowReservationModal(selectedDateRange);
    } else {
      setDateError(true);
    }
  };

  function calculatePrice(date, activeRanges, defaultPrice) {
    for (const range of activeRanges) {
      const fromDate = new Date(range.from);
      const toDate = new Date(range.to);

      if (date >= fromDate && date <= toDate) {
        return range.price;
      }
    }

    return defaultPrice;
  }

  return (
    <div>
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
        dayContentRenderer={(day) => {
          const price = calculatePrice(day, activeRanges, defaultPrice);
          const date = new Date(day);
          const dayOfMonth = date.getDate();

          const isDateInArray = extractedDates.some((item) => {
            const itemDate = new Date(item);
            const formattedItemDate = moment(itemDate).format("DD-MM-YYYY");
            const formattedCurrentDate = moment(date).format("DD-MM-YYYY");
            return formattedItemDate === formattedCurrentDate;
          });
          return (
            <div
              className={`calendar-day-wrapper ${
                isDateInArray ? "half_day" : ""
              }`}
            >
              <span>{dayOfMonth}</span>
              <sub>{price}</sub>
            </div>
          );
        }}
      />
      {dateError && (
        <div className="text-danger error_date_range">
          <FormattedMessage id="you_must_select_a_range" />
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center selection_days_wrapper">
        <div className="flex gap-2 align-items-center">
          <div className="selected_period"></div>
          <div className="selected_labels">
            <FormattedMessage id="Selected" />
          </div>
        </div>
        <div className="flex gap-2 align-items-center">
          <div className="selected_period available_period"></div>
          <div className="selected_labels">
            <FormattedMessage id="Avaliable" />
          </div>
        </div>
        <div className="flex gap-2 align-items-center">
          <div className="selected_period not_available"></div>
          <div className="selected_labels">
            <FormattedMessage id="Not_Avaliable" />
          </div>
        </div>
        <div className="flex gap-2 align-items-center">
          <div className="selected_period checkout"></div>
          <div className="selected_labels">
            <FormattedMessage id="checkout" />
          </div>
        </div>
      </div>
      <button
        className="reservation_btn"
        onClick={() => {
          handleReserve();
        }}
      >
        <FormattedMessage id="Reserve" />{" "}
      </button>
    </div>
  );
};

export default DateRangeCalendarPicker;
