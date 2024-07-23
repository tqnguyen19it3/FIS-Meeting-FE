import React from "react";

const TimeCol = () => {
  const hours = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  return (
    <div className="flex flex-col w-[120px] bg-time-col-color py-[20px] border-l-[1px]">
      {hours.map((hour, index) => (
        <div key={index} className="h-[60px] flex font-semibold items-center justify-center">
          {hour}
        </div>
      ))}
    </div>
  );
};

export default TimeCol;
