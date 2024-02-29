import React, { useState } from "react";
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
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [dateError, setDateError] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);
  const getAllDays = (activeReservations) => {
    const allDays = [];

    activeReservations.forEach((range) => {
      const startDate = new Date(range.from);
      const endDate = new Date(range.to) - 1;

      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        allDays.push(new Date(currentDate.toISOString().split("T")[0]));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      console.log("currentDate", currentDate.getDate());
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
      getSummary(summaryData)
        .then((res) => {
          handleShowReservationModal(res?.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setDateError(true);
    }
  };

  function calculatePrice(date, activeRanges, defaultPrice) {
    for (const range of activeRanges) {
      const fromDate = new Date(range.from + " GMT+0200");
      const toDate = new Date(range.to + " GMT+0200");
      if (
        date.getTime() >= fromDate.getTime() &&
        date.getTime() < toDate.getTime()
      ) {
        console.log("here");
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
        <FormattedMessage id="Summary" />{" "}
      </button>
    </div>
  );
};

export default DateRangeCalendarPicker;
