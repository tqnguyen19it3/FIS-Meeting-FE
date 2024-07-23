import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIC from "./calendar_ic.svg";
import moment from "moment-timezone";
import { toast } from "react-toastify";

const DateTimePicker = ({ label, name, value, action, }) => {
  const [startDate, setStartDate] = useState(value ? value : "");

  const handleChangeDate = (date) => {
    const selectedDate = moment(date).tz("Asia/Ho_Chi_Minh");
    const currentDate = moment(new Date()).tz("Asia/Ho_Chi_Minh");
    if(selectedDate.isSameOrAfter(currentDate, 'day')){
      setStartDate(date);
      action({ target: { name, value: date } });
    }else{
      toast.error(`Error Validate: You cannot set a date to fall on a date in the past`);
      setStartDate("");
    }
  }

  return (
    <div className="test">
      {label && (
        <span className="font-regular font-sans text-sm block mb-4 text-[#343434]">
          {label}
        </span>
      )}
      <DatePicker
        className="w-full font-medium text-black"
        selected={startDate}
        onChange={handleChangeDate}
        customInput={
          <div className="px-3 py-2 w-full flex items-center justify-between rounded-[10px] border">
            <span className="font-sans w-full font-regular text-sm text-[#7E7E7E]">
              {startDate
                ? moment(startDate).tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY")
                : "Chọn"
              }
            </span>
            <img src={CalendarIC} width={16} height={16} />
          </div>
        }
      />
    </div>
  );
};

export default DateTimePicker;
