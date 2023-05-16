import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import the default styles
import 'react-date-range/dist/theme/default.css'; 
import "./YourComponent.css"

const YourComponent = () => {

    const dateRanges = [
        {
            "id": 171,
            "from": "2023-05-13T00:00:00.000000Z",
            "to": "2023-05-17T00:00:00.000000Z",
            "total_price": 10000,
            "status": "approved",
            "days": 4,
            "is_reviewed": false
        },
        {
            "id": 177,
            "from": "2023-05-24T00:00:00.000000Z",
            "to": "2023-05-27T00:00:00.000000Z",
            "total_price": 6000,
            "status": "approved",
            "days": 3,
            "is_reviewed": false
        },
        {
            "id": 181,
            "from": "2023-05-31T00:00:00.000000Z",
            "to": "2023-06-02T00:00:00.000000Z",
            "total_price": 2400,
            "status": "pending",
            "days": 2,
            "is_reviewed": false
        },
        {
            "id": 180,
            "from": "2023-06-06T00:00:00.000000Z",
            "to": "2023-06-09T00:00:00.000000Z",
            "total_price": 7000,
            "status": "approved",
            "days": 3,
            "is_reviewed": false
        },
        {
            "id": 178,
            "from": "2023-07-19T00:00:00.000000Z",
            "to": "2023-07-22T00:00:00.000000Z",
            "total_price": 6000,
            "status": "approved",
            "days": 3,
            "is_reviewed": false
        },
        {
            "id": 179,
            "from": "2023-07-25T00:00:00.000000Z",
            "to": "2023-07-27T00:00:00.000000Z",
            "total_price": 3000,
            "status": "approved",
            "days": 2,
            "is_reviewed": false
        },
        {
            "id": 184,
            "from": "2023-10-07T00:00:00.000000Z",
            "to": "2023-10-10T00:00:00.000000Z",
            "total_price": 6000,
            "status": "pending",
            "days": 3,
            "is_reviewed": false
        },
        {
            "id": 185,
            "from": "2023-11-07T00:00:00.000000Z",
            "to": "2023-12-10T00:00:00.000000Z",
            "total_price": 66000,
            "status": "pending",
            "days": 33,
            "is_reviewed": false
        }
    ]

    const getAllDays = (dateRanges) => {
        const allDays = [];
      
        dateRanges.forEach((range) => {
          const startDate = new Date(range.from);
          const endDate = new Date(range.to);
      
          const currentDate = new Date(startDate);
          while (currentDate <= endDate) {
            allDays.push(new Date(currentDate.toISOString().split('T')[0]));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });
      
        return allDays;
      };
      
      const allDaysArray = getAllDays(dateRanges);
      console.log(allDaysArray);

    // const [selectedRange, setSelectedRange] = useState([
    //     {
    //         startDate: new Date(),
    //         endDate: null,
    //         key: 'selection',
    //         color: '#3f51b5'
    //     }
    //   ]);

    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
   });
    const activeRanges =[
        {
            "id": 68,
            "from": "2023-05-15T00:00:00.000000Z",
            "to": "2023-05-20T00:00:00.000000Z",
            "price": 3000,
            "total_price": 15000,
            "days_count": 5,
            "created_at": "2022-11-25T23:40:25.000000Z"
        },
        {
            "id": 157,
            "from": "2023-08-23T00:00:00.000000Z",
            "to": "2023-08-26T00:00:00.000000Z",
            "price": 1500,
            "total_price": 4500,
            "days_count": 3,
            "created_at": "2023-01-17T12:15:18.000000Z"
        },
        {
            "id": 161,
            "from": "2023-05-31T00:00:00.000000Z",
            "to": "2023-06-03T00:00:00.000000Z",
            "price": 1200,
            "total_price": 3600,
            "days_count": 3,
            "created_at": "2023-01-17T12:34:14.000000Z"
        },
        {
            "id": 170,
            "from": "2023-06-08T00:00:00.000000Z",
            "to": "2023-06-11T00:00:00.000000Z",
            "price": 3000,
            "total_price": 9000,
            "days_count": 3,
            "created_at": "2023-05-02T18:35:43.000000Z"
        },
        {
            "id": 171,
            "from": "2023-06-15T00:00:00.000000Z",
            "to": "2023-06-18T00:00:00.000000Z",
            "price": 3000,
            "total_price": 9000,
            "days_count": 3,
            "created_at": "2023-05-02T18:35:54.000000Z"
        },
        {
            "id": 172,
            "from": "2023-06-22T00:00:00.000000Z",
            "to": "2023-06-25T00:00:00.000000Z",
            "price": 3000,
            "total_price": 9000,
            "days_count": 3,
            "created_at": "2023-05-02T18:36:08.000000Z"
        },
        {
            "id": 173,
            "from": "2023-06-12T00:00:00.000000Z",
            "to": "2023-06-14T00:00:00.000000Z",
            "price": 1500,
            "total_price": 3000,
            "days_count": 2,
            "created_at": "2023-05-02T18:36:54.000000Z"
        },
        {
            "id": 174,
            "from": "2023-06-26T00:00:00.000000Z",
            "to": "2023-06-28T00:00:00.000000Z",
            "price": 1400,
            "total_price": 2800,
            "days_count": 2,
            "created_at": "2023-05-02T18:37:55.000000Z"
        }
    ];

    const handleSelect = ranges => {
        setSelectedDateRange(ranges.selection);
        console.log(ranges.selection);
   };

    function calculatePrice(date, activeRanges) {
        const defaultPrice = 2000;
      
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
            // date={selectedRange}
            // onChange={(range) => setSelectedRange(range)}

            // ranges={selectedRange}
            ranges={[selectedDateRange]}
            onChange={handleSelect}
            // onChange={ranges => console.log("tttt",ranges)}
            // showSelectionPreview={true}
            direction="horizontal"
            disabledDates={allDaysArray}
            showMonthAndYearPickers={false}
            
            minDate={new Date()}
            dayContentRenderer={(day) => {
              const price = calculatePrice(day, activeRanges);
    
              return (
                <div className='calendar-day-wrapper'>
                  <span>{day.getDate()}</span>
                  <sub>{price}</sub>
                </div>
              );
            }}
          />
        </div>
      );
  };
  
  export default YourComponent;