import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIC from "./calendar_ic.svg";
import moment from "moment-timezone";
import { toast } from "react-toastify";

const DateTimePicker = ({ label, name, value, action, isValidated }) => {
  const [selectDate, setSelectDate] = useState(null);
  const currentDate = moment(new Date()).tz("Asia/Ho_Chi_Minh");

  useEffect(() => {
    if (value) setSelectDate(value)
  }, [value])

  const handleValidateAndSetDate = (date) => {
    const selectedDate = moment(date).tz("Asia/Ho_Chi_Minh");
    if(isValidated) {
      if(selectedDate.isSameOrAfter(currentDate, 'day')){
        setSelectDate(date);
        action({ target: { name, value: date } });
      }else{
        toast.error(`Xác thực lỗi: Bạn không thể đặt ngày rơi vào một ngày trong quá khứ`);
        setSelectDate("");
      }
    } else {
      setSelectDate(date);
      action({ target: { name, value: date } });
    }
  }

  return (
    <div className="datePicker font-regular font-sans text-sm">
      {label && (
        <span className="block mb-1 text-[#343434]">
          {label}
        </span>
      )}
      <DatePicker
        className="w-full text-black"
        selected={selectDate}
        onChange={handleValidateAndSetDate}
        customInput={
          <div className="px-3 py-2 w-full flex items-center justify-between rounded-[10px] border">
            <span className="font-sans w-full font-regular text-sm text-[#7E7E7E]">
              {selectDate
                ? moment(selectDate).tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY")
                : currentDate.format("DD-MM-YYYY")
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
